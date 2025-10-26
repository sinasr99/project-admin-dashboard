"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const checkId = (reqParam) => {
    return (req, res, next) => {
        const id = req.params[reqParam];
        if (!id)
            return res.status(400).send("User id is required");
        if (!(0, mongoose_1.isValidObjectId)(id))
            return res.status(400).send("User id is invalid");
        next();
    };
};
exports.default = checkId;
//# sourceMappingURL=checkId.js.map