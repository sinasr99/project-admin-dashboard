import {Router} from "express"
import {ValidationError} from "yup";
import connectToDB from "../helperFunctions/connectToDB";
import userModel from "../models/userModel";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import {randomInt} from "crypto"
import otpModel from "../models/otpModel";
import otpEmailValidator from "../validators/otpEmailValidator";
import {isValidObjectId} from "mongoose";
import phoneValidator from "../validators/phoneValidator";
import checkUserInfo from "../middlewares/checkUserInfo";
import loginValidator from "../validators/loginValidator";

dotenv.config()

const router = Router()

router.post("/send-email", checkUserInfo, async (req, res) => {

    const {phone, email} = req.body

    // Connect to Database :
    await connectToDB()

    // Does Exist User :
    await connectToDB()

    const userResult = await userModel.findOne({$or: [{phone}, {email}]})

    if (userResult) {
        return res.status(409).send("User already with the phone or email exists")
    }

    // Save Otp Code to DB :
    const codeEmail: string = randomInt(1000, 10_000).toString()
    const towMinutesLater: number = new Date(Date.now() + ((2 * 60) * 1000)).getTime()

    const otpResult = await otpModel.create({code: codeEmail, expireTime: towMinutesLater})

    // Send Email Code :

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.authorEmail,
            pass: process.env.appPassword,
        },
    })

    try {
        await transporter.sendMail({
            from: process.env.authorEmail,
            to: email,
            subject: "Email code verification",
            html: `
    <h3 style="color: green; font-size: 30px; font-weight: 700">Your email code verification</h3>
    <div style="text-align: center; line-height: 30px; margin-bottom: 1rem; display: flex; justify-content: center; align-items: center">
        <span style="text-align: center; line-height: 30px; font-size: 1.5rem; display: block; width: 30px; height: 30px; border: 1px solid black; border-radius: 7px; padding: 5px;">${codeEmail[0]}</span>
        <span style="text-align: center; line-height: 30px; margin-left: 1rem; font-size: 1.5rem; display: block; width: 30px; height: 30px; border: 1px solid black; border-radius: 7px; padding: 5px;">${codeEmail[1]}</span>
        <span style="text-align: center; line-height: 30px; margin-left: 1rem; font-size: 1.5rem; display: block; width: 30px; height: 30px; border: 1px solid black; border-radius: 7px; padding: 5px;">${codeEmail[2]}</span>
        <span style="text-align: center; line-height: 30px; margin-left: 1rem; ; display: block; font-size: 1.5rem; width: 30px; height: 30px; border: 1px solid black; border-radius: 7px; padding: 5px;">${codeEmail[3]}</span>
    </div>
    `
        })

        return res.status(201).send({message: "Email verification code sent successfully", otpId: otpResult._id})
    } catch (error) {
        return res.status(500).send("Server couldn't send email verification code")
    }
})

router.post("/send-phone", async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send("Request body is invalid")
    }

    const {phone, checkExistsPhone} = req.body

    try {
        if (typeof checkExistsPhone !== "boolean") {
            return res.status(400).send("checkExistsPhone is required")
        }

        phoneValidator.validateSync({phone}, {abortEarly: false})
    } catch (error) {
        let errors: string[] = []
        if (error instanceof ValidationError) {
            errors = error.inner.map(err => err.message)
        }

        return res.status(400).send({errors})
    }

    if (checkExistsPhone) {
        await connectToDB()

        const userResult = await userModel.findOne({phone})

        if (!userResult)
            return res.status(404).send("User with the phone not found")
    }

    const code: string = randomInt(1000, 10_000).toString()
    const expireTime: number = new Date(Date.now() + (2 * 60 * 1000)).getTime()

    try {
        await fetch("https://api.sms.ir/v1/send/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-API-KEY": "syYqIgjWf2qq2IoXTYS2kncGlHI9jsX2RruzH7Nctbj8lesJ"
            },
            body: JSON.stringify({
                "mobile": phone,
                "templateId": 210518,
                "parameters": [
                    {
                        "name": "CODE",
                        "value": code
                    }
                ]
            })
        })
    } catch (error) {
        return res.status(404).send("Phone number is invalid")
    }

    await connectToDB()

    const otpResult = await otpModel.create({code, expireTime})
    res.status(201).send({message: "Code sent successfully to your phone", otpId: otpResult._id})
})

router.post("/check-otp", async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send("Request body is invalid")
    }

    const {id, code} = req.body

    if (!isValidObjectId(id)) {
        return res.status(400).send("otp id is invalid")
    }

    try {
        otpEmailValidator.validateSync({code}, {abortEarly: false})
    } catch (error) {
        let errors: string[] = []
        if (error instanceof ValidationError) {
            errors = error.inner.map(error => error.message)
        }

        return res.status(400).send({errors: errors})
    }

    await connectToDB()

    const otpResult = await otpModel.findOne({_id: id, code})


    if (!otpResult) {
        return res.status(404).send("Otp is invalid")
    }

    if (otpResult.expireTime <= Date.now()) {
        return res.status(410).send("Otp is expired")
    }

    res.send("Otp is valid")
})

router.post("/register", checkUserInfo, async (req, res) => {

    const {name, email, phone, password} = req.body

    await connectToDB()

    // User count :
    const usersCount: number = await userModel.countDocuments()

    let role: "USER" | "ADMIN" = usersCount ? "USER" : "ADMIN"

    // Does User Exists :
    const userResult = await userModel.findOne({$or: [{email}, {phone}]})

    if (userResult) {
        return res.status(409).send("User with the email or phone already exists")
    }

    // Hashed Password :
    const hashedPassword = bcrypt.hashSync(password, 10)

    // Generate Token :
    const token = jwt.sign({email}, process.env.tokenKey as string, {expiresIn: "3d"})

    // Create User To DB :
    const newUser = await userModel.create({name, email, phone, password: hashedPassword, role, isBlocked: false})
    const newUserObj = newUser.toObject() as any
    delete newUserObj.password
    delete newUserObj.__v

    res.status(201).send({message: "User registered successfully", user: newUserObj, token})
})

router.post("/login", async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send("Request body is invalid")
    }

    const {email, password} = req.body

    // Validation :
    try {
        loginValidator.validateSync({email, password}, {abortEarly: false})
    } catch (error) {
        let errors: string[] = []

        if (error instanceof ValidationError) {
            errors = error.inner.map(err => err.message)
        }

        return res.status(400).send(errors)
    }

    await connectToDB()

    // Check Email :
    const userResult = await userModel.findOne({email})

    if (!userResult)
        return res.status(404).send("Email or Password is incorrect")

    // Check Password :
    const isValidPassword: boolean = bcrypt.compareSync(password, userResult.password)

    if (!isValidPassword)
        return res.status(404).send("Email or Password is incorrect")

    // Generate Token :
    const token = jwt.sign({email}, process.env.tokenKey || "", {expiresIn: "3d"})

    return res.send({message: "User logged in successfully", token})
})

router.get("/get-me", async (req, res) => {
    const {token} = req.headers

    if (typeof token !== "string")
        return res.status(400).send("Token is required")

    let email = ""

    try {
        const tokenPayload: any = jwt.verify(token, process.env.tokenKey || "")
        email = tokenPayload?.email || ""
    } catch (error) {
        console.log(`token error => ${error}`)
        return res.status(401).send("Token is invalid")
    }

    await connectToDB()

    const userResult = await userModel.findOne({email})

    if (!userResult)
        return res.status(403).send("User is not registered")

    const userObj = userResult.toObject() as any
    delete userObj.password
    delete userObj.__v
    delete userObj._id

    return res.send({user: userObj})
})

export default router