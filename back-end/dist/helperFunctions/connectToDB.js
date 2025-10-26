"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectToDB = async () => {
    try {
        await (0, mongoose_1.connect)(process.env.dbUrl);
        console.log(`Server connected to db with the url : ${process.env.dbUrl}`);
    }
    catch (error) {
        console.log(`error connect to database :\n`, error);
    }
};
exports.default = connectToDB;
//# sourceMappingURL=connectToDB.js.map