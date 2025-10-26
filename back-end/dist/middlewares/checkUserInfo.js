"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userValidation_1 = __importDefault(require("../validators/userValidation"));
const yup_1 = require("yup");
const checkUserInfo = (req, res, next) => {
    if (typeof req.body !== "object") {
        console.log("type => ", typeof req.body);
        return res.status(400).send("Request body is invalid");
    }
    const { name, email, phone, password } = req.body;
    // Validation Inputs :
    try {
        userValidation_1.default.validateSync({ name, email, phone, password }, { abortEarly: false });
        next();
    }
    catch (err) {
        let errors = [];
        if (err instanceof yup_1.ValidationError) {
            errors = err.inner.map(err => err.message);
        }
        return res.status(400).send({ errors: errors });
    }
};
exports.default = checkUserInfo;
//# sourceMappingURL=checkUserInfo.js.map