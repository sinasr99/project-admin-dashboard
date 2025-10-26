"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const connectToDB_1 = __importDefault(require("./connectToDB"));
const userModel_1 = __importDefault(require("../models/userModel"));
dotenv_1.default.config();
const justAdminUse = async (req, res, next) => {
    const { token } = req.headers;
    if (typeof token !== "string")
        return res.status(401).send("User is not authorized");
    let email = "";
    try {
        const tokenResult = jsonwebtoken_1.default.verify(token, process.env.tokenKey || "");
        email = tokenResult?.email || "";
    }
    catch (error) {
        return res.status(401).send("User is not authorized");
    }
    await (0, connectToDB_1.default)();
    const userResult = await userModel_1.default.findOne({ email });
    if (!userResult || userResult.role !== "ADMIN")
        return res.status(403).send("User doesn't have access permission");
    next();
};
exports.default = justAdminUse;
//# sourceMappingURL=justAdminUse.js.map