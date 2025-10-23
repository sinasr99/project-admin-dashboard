"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidation_1 = __importDefault(require("../validators/userValidation"));
const yup_1 = require("yup");
const connetToDB_1 = __importDefault(require("../helperFunctions/connetToDB"));
const userModal_1 = __importDefault(require("../models/userModal"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../.env") });
const router = (0, express_1.Router)();
router.post("/register", async (req, res) => {
    if (typeof req.body !== "object") {
        return res.status(400).send("Request body is invalid");
    }
    const { name, email, phone, password } = req.body;
    let role = "USER";
    // Validation Inputs :
    try {
        userValidation_1.default.validateSync({ name, email, phone, password }, { abortEarly: false });
    }
    catch (err) {
        let errors = [];
        if (err instanceof yup_1.ValidationError) {
            errors = err.inner.map(err => err.message);
        }
        return res.status(400).send({ errors: errors });
    }
    // Does Exist User :
    await (0, connetToDB_1.default)();
    const userResult = await userModal_1.default.findOne({ $or: [{ phone }, { email }] });
    if (userResult) {
        return res.status(409).send("User already with the phone or email exists");
    }
    // is Admin Or User :
    role = await userModal_1.default.countDocuments() ? "USER" : "ADMIN";
    // Hashed Password :
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    // Generate Token :
    const token = jsonwebtoken_1.default.sign({ email }, process.env.tokenKey, { expiresIn: "3d" });
    // Create User To DB :
    const newUser = await userModal_1.default.create({ name, email, phone, password, role });
    const newUserObj = newUser.toObject();
    delete newUserObj.password;
    delete newUserObj.__v;
    res.status(201).send({ message: "User registered successfully", user: newUserObj, token });
});
exports.default = router;
//# sourceMappingURL=auth.js.map