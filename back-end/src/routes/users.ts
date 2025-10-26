import {Router} from "express"
import checkUserInfo from "../middlewares/checkUserInfo";
import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
import checkRole from "../helperFunctions/checkRole";
import justAdminUse from "../middlewares/justAdminUse";
import {Types} from "mongoose";
import checkId from "../middlewares/checkId";
import connectToDB from "../helperFunctions/connectToDB";
import {ValidationError} from "yup";
import searchValidator, {UserSortProps, UserFilterProps} from "../validators/searchUsersValidator";

const router = Router()

router.get("", justAdminUse, async (req, res) => {
    const page = req.headers.page ? +req.headers.page : 0
    const filter = req.headers.filter || ""
    const sort = req.headers.sort || ""
    const search = req.headers.search?.toString().trim() || ""

    try {
        searchValidator.validateSync({page, filter, sort, search}, {abortEarly: false})
    } catch (error) {
        let errors: string[] = []

        if (error instanceof ValidationError)
            errors = error.inner.map(err => err.message)

        return res.status(400).send(errors)
    }

    await connectToDB()

    const maximumPage: number = Math.ceil(await userModel.countDocuments() / 10)

    if (page > maximumPage)
        return res.status(400).send("Page number is invalid")

    let filterQuery = {}
    switch (filter as UserFilterProps) {
        case "Default": {
            filterQuery = {}
            break
        }
        case "Blocked users": {
            filterQuery = {isBlocked: true}
            break
        }
        case "Unblocked users": {
            filterQuery = {isBlocked: false}
            break
        }
        case "Just admins": {
            filterQuery = {role: "ADMIN"}
            break
        }
        case "Just users": {
            filterQuery = {role: "USER"}
            break
        }
    }

    let sortQuery: {} = {createdAt: -1}
    switch (sort as UserSortProps) {
        case "Default": {
            sortQuery = {createdAt: -1}
            break
        }
        case "Sort by highest level": {
            sortQuery = {role: 1}
            break
        }
        case "Sort by lowest level": {
            sortQuery = {role: -1}
            break
        }
        case "Sort by maximum bought": {
            sortQuery = {sell: -1}
            break
        }
        case "Sort by minimum bought": {
            sortQuery = {sell: 1}
            break
        }
    }

    const searchQuery = search ? {name: {$regex: search, $options: "i"}} : {}

    // Limit and Skip :
    const itemCountByPage: number = 10
    const limit = page * itemCountByPage
    const skip: number = (page - 1) * itemCountByPage

    const usersResult = await userModel.find({
        ...filterQuery, ...searchQuery
    })
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)

    res.send(usersResult)
})

router.delete("/:userId", justAdminUse, checkId("userId"), async (req, res) => {
    const id = req.params.userId

    await connectToDB()

    const userResult = await userModel.findOneAndDelete({_id: id}, {new: true})

    if (!userResult)
        return res.status(404).send("User not found to remove")

    const userObj = userResult.toObject() as any
    delete userObj.password
    delete userObj.__v
    res.send({message: "User removed successfully", user: userObj})
})

router.post("/add", justAdminUse, checkUserInfo, async (req, res) => {
    const {name, email, phone, role, password} = req.body

    if (typeof role !== "string")
        return res.status(400).send("User role is required")

    if (!checkRole(role))
        return res.status(400).send("User role is invalid")

    // Check User Email Or Phone Exists :
    const userResult = await userModel.findOne({$or: [{email}, {phone}]})

    if (userResult) {
        if (userResult.email === email)
            return res.status(409).send("User with the email is already exists")
        else
            return res.status(409).send("User with the phone is already exists")
    }

    // Hashed Password :
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Add User to DB :
    await userModel.create({name, email, phone, password: hashedPassword, role})
    res.status(201).send("User created successfully")
})

router.put("/:userId", justAdminUse, checkId("userId"), checkUserInfo, async (req, res) => {
    const id = req.params.userId
    const {name, email, phone, password, role} = req.body

    if (!checkRole(role))
        return res.status(400).send("User role is required or invalid")

    await connectToDB()

    const hashedPassword = bcrypt.hashSync(password, 10)

    // Is new Email & Phone doesn't user :
    const userExists = await userModel.findOne(
        {
            $or: [{email}, {phone}],
            _id: {$ne: new Types.ObjectId(id)}

        }
    )

    if (userExists)
        return res.status(409).send("User with the email or phone is already exists")

    const userResult = await userModel.findOneAndUpdate(
        {_id: id},
        {name, email, phone, role, password: hashedPassword},
        {new: true}
    )

    if (!userResult)
        return res.status(404).send("User not found to update")

    const userObj = userResult.toObject() as any
    delete userObj.password
    delete userObj.__v

    res.send({message: "User updated successfully", user: userObj})
})

router.put("/block/:userId", justAdminUse, checkId("userId"), async (req, res) => {
    const id = req.params.userId as string

    await connectToDB()

    const userResult = await userModel.findOneAndUpdate(
        {_id: id, role: {$ne: "ADMIN"}},
        [
            {$set: {isBlocked: {$not: "$isBlocked"}}}],
        {new: true}
    )

    if (!userResult)
        return res.status(404).send("User with the id not found")

    const userObj = userResult.toObject() as any
    delete userObj.password
    delete userObj.__v
    res.send({message: `User changed to ${userObj.isBlocked ? "blocked" : "unblocked"} status`, user: userObj})
})

export default router