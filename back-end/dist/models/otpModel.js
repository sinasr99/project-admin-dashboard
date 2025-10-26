"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    code: {
        type: String,
        required: true,
        length: 4
    },
    expireTime: {
        type: Number,
        required: true,
    }
});
exports.default = (0, mongoose_1.model)("OtpModel", schema);
//# sourceMappingURL=otpModel.js.map