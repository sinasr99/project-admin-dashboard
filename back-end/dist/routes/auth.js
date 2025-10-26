"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const yup_1 = require("yup");
const connectToDB_1 = __importDefault(require("../helperFunctions/connectToDB"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = require("crypto");
const otpModel_1 = __importDefault(require("../models/otpModel"));
const otpEmailValidator_1 = __importDefault(require("../validators/otpEmailValidator"));
const mongoose_1 = require("mongoose");
const phoneValidator_1 = __importDefault(require("../validators/phoneValidator"));
const checkUserInfo_1 = __importDefault(require("../middlewares/checkUserInfo"));
const loginValidator_1 = __importDefault(require("../validators/loginValidator"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.post("/send-email", checkUserInfo_1.default, async (req, res) => {
    const { phone, email } = req.body;
    // Connect to Database :
    await (0, connectToDB_1.default)();
    // Does Exist User :
    await (0, connectToDB_1.default)();
    const userResult = await userModel_1.default.findOne({ $or: [{ phone }, { email }] });
    if (userResult) {
        return res.status(409).send("User already with the phone or email exists");
    }
    // Save Otp Code to DB :
    const codeEmail = (0, crypto_1.randomInt)(1000, 10000).toString();
    const towMinutesLater = new Date(Date.now() + ((2 * 60) * 1000)).getTime();
    const otpResult = await otpModel_1.default.create({ code: codeEmail, expireTime: towMinutesLater });
    // Send Email Code :
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.authorEmail,
            pass: process.env.appPassword,
        },
    });
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
        });
        return res.status(201).send({ message: "Email verification code sent successfully", otpId: otpResult._id });
    }
    catch (error) {
        return res.status(500).send("Server couldn't send email verification code");
    }
});
router.post("/send-phone", async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send("Request body is invalid");
    }
    const { phone, checkExistsPhone } = req.body;
    try {
        if (typeof checkExistsPhone !== "boolean") {
            return res.status(400).send("checkExistsPhone is required");
        }
        phoneValidator_1.default.validateSync({ phone }, { abortEarly: false });
    }
    catch (error) {
        let errors = [];
        if (error instanceof yup_1.ValidationError) {
            errors = error.inner.map(err => err.message);
        }
        return res.status(400).send({ errors });
    }
    if (checkExistsPhone) {
        await (0, connectToDB_1.default)();
        const userResult = await userModel_1.default.findOne({ phone });
        if (!userResult)
            return res.status(404).send("User with the phone not found");
    }
    const code = (0, crypto_1.randomInt)(1000, 10000).toString();
    const expireTime = new Date(Date.now() + (2 * 60 * 1000)).getTime();
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
        });
    }
    catch (error) {
        return res.status(404).send("Phone number is invalid");
    }
    await (0, connectToDB_1.default)();
    const otpResult = await otpModel_1.default.create({ code, expireTime });
    res.status(201).send({ message: "Code sent successfully to your phone", otpId: otpResult._id });
});
router.post("/check-otp", async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send("Request body is invalid");
    }
    const { id, code } = req.body;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        return res.status(400).send("otp id is invalid");
    }
    try {
        otpEmailValidator_1.default.validateSync({ code }, { abortEarly: false });
    }
    catch (error) {
        let errors = [];
        if (error instanceof yup_1.ValidationError) {
            errors = error.inner.map(error => error.message);
        }
        return res.status(400).send({ errors: errors });
    }
    await (0, connectToDB_1.default)();
    const otpResult = await otpModel_1.default.findOne({ _id: id, code });
    if (!otpResult) {
        return res.status(404).send("Otp is invalid");
    }
    if (otpResult.expireTime <= Date.now()) {
        return res.status(410).send("Otp is expired");
    }
    res.send("Otp is valid");
});
router.post("/register", checkUserInfo_1.default, async (req, res) => {
    const { name, email, phone, password } = req.body;
    await (0, connectToDB_1.default)();
    // User count :
    const usersCount = await userModel_1.default.countDocuments();
    let role = usersCount ? "USER" : "ADMIN";
    // Does User Exists :
    const userResult = await userModel_1.default.findOne({ $or: [{ email }, { phone }] });
    if (userResult) {
        return res.status(409).send("User with the email or phone already exists");
    }
    // Hashed Password :
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    // Generate Token :
    const token = jsonwebtoken_1.default.sign({ email }, process.env.tokenKey, { expiresIn: "3d" });
    // Create User To DB :
    const newUser = await userModel_1.default.create({ name, email, phone, password: hashedPassword, role, isBlocked: false });
    const newUserObj = newUser.toObject();
    delete newUserObj.password;
    delete newUserObj.__v;
    res.status(201).send({ message: "User registered successfully", user: newUserObj, token });
});
router.post("/login", async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send("Request body is invalid");
    }
    const { email, password } = req.body;
    // Validation :
    try {
        loginValidator_1.default.validateSync({ email, password }, { abortEarly: false });
    }
    catch (error) {
        let errors = [];
        if (error instanceof yup_1.ValidationError) {
            errors = error.inner.map(err => err.message);
        }
        return res.status(400).send(errors);
    }
    await (0, connectToDB_1.default)();
    // Check Email :
    const userResult = await userModel_1.default.findOne({ email });
    if (!userResult)
        return res.status(404).send("Email or Password is incorrect");
    // Check Password :
    const isValidPassword = bcryptjs_1.default.compareSync(password, userResult.password);
    if (!isValidPassword)
        return res.status(404).send("Email or Password is incorrect");
    // Generate Token :
    const token = jsonwebtoken_1.default.sign({ email }, process.env.tokenKey || "", { expiresIn: "3d" });
    return res.send({ message: "User logged in successfully", token });
});
router.get("/get-me", async (req, res) => {
    const { token } = req.headers;
    if (typeof token !== "string")
        return res.status(400).send("Token is required");
    let email = "";
    try {
        const tokenPayload = jsonwebtoken_1.default.verify(token, process.env.tokenKey || "");
        email = tokenPayload?.email || "";
    }
    catch (error) {
        console.log(`token error => ${error}`);
        return res.status(401).send("Token is invalid");
    }
    await (0, connectToDB_1.default)();
    const userResult = await userModel_1.default.findOne({ email });
    if (!userResult)
        return res.status(403).send("User is not registered");
    const userObj = userResult.toObject();
    delete userObj.password;
    delete userObj.__v;
    delete userObj._id;
    return res.send({ user: userObj });
});
exports.default = router;
//# sourceMappingURL=auth.js.map