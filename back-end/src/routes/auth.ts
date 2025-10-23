import {Router} from "express"
import userValidator from "../validators/userValidation";
import {ValidationError} from "yup";
import connectToDB from "../helperFunctions/connetToDB";
import userModal from "../models/userModal";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(__dirname, "../.env")})

const router = Router()

router.post("/register", async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send("Request body is invalid")
    }

    const {name, email, phone, password} = req.body
    let role: "ADMIN" | "USER" = "USER"

    // Validation Inputs :
    try {
        userValidator.validateSync({name, email, phone, password}, {abortEarly: false})
    } catch (err) {
        let errors: string[] = []
        if (err instanceof ValidationError) {
            errors = err.inner.map(err => err.message)
        }

        return res.status(400).send({errors: errors})
    }

    // Does Exist User :
    await connectToDB()

    const userResult = await userModal.findOne({$or: [{phone}, {email}]})

    if (userResult) {
        return res.status(409).send("User already with the phone or email exists")
    }

    // is Admin Or User :
    role = await userModal.countDocuments() ? "USER" : "ADMIN"

    // Hashed Password :
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Generate Token :
    const token = jwt.sign({email}, process.env.tokenKey as string, {expiresIn: "3d"})

    // Create User To DB :
    const newUser = await userModal.create({name, email, phone, password, role})
    const newUserObj = newUser.toObject() as any
    delete newUserObj.password
    delete newUserObj.__v

    res.status(201).send({message: "User registered successfully", user: newUserObj, token})
})

export default router