"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkUserInfo_1 = __importDefault(require("../middlewares/checkUserInfo"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const checkRole_1 = __importDefault(require("../helperFunctions/checkRole"));
const justAdminUse_1 = __importDefault(require("../middlewares/justAdminUse"));
const mongoose_1 = require("mongoose");
const checkId_1 = __importDefault(require("../middlewares/checkId"));
const connectToDB_1 = __importDefault(require("../helperFunctions/connectToDB"));
const yup_1 = require("yup");
const searchUsersValidator_1 = __importDefault(require("../validators/searchUsersValidator"));
const router = (0, express_1.Router)();
router.get("", justAdminUse_1.default, async (req, res) => {
    const page = req.headers.page ? +req.headers.page : 0;
    const filter = req.headers.filter || "";
    const sort = req.headers.sort || "";
    const search = req.headers.search?.toString().trim() || "";
    try {
        searchUsersValidator_1.default.validateSync({ page, filter, sort, search }, { abortEarly: false });
    }
    catch (error) {
        let errors = [];
        if (error instanceof yup_1.ValidationError)
            errors = error.inner.map(err => err.message);
        return res.status(400).send(errors);
    }
    await (0, connectToDB_1.default)();
    const maximumPage = Math.ceil(await userModel_1.default.countDocuments() / 10);
    if (page > maximumPage)
        return res.status(400).send("Page number is invalid");
    let filterQuery = {};
    switch (filter) {
        case "Default": {
            filterQuery = {};
            break;
        }
        case "Blocked users": {
            filterQuery = { isBlocked: true };
            break;
        }
        case "Unblocked users": {
            filterQuery = { isBlocked: false };
            break;
        }
        case "Just admins": {
            filterQuery = { role: "ADMIN" };
            break;
        }
        case "Just users": {
            filterQuery = { role: "USER" };
            break;
        }
    }
    let sortQuery = { createdAt: -1 };
    switch (sort) {
        case "Default": {
            sortQuery = { createdAt: -1 };
            break;
        }
        case "Sort by highest level": {
            sortQuery = { role: 1 };
            break;
        }
        case "Sort by lowest level": {
            sortQuery = { role: -1 };
            break;
        }
        case "Sort by maximum bought": {
            sortQuery = { sell: -1 };
            break;
        }
        case "Sort by minimum bought": {
            sortQuery = { sell: 1 };
            break;
        }
    }
    const searchQuery = search ? { name: { $regex: search, $options: "i" } } : {};
    // Limit and Skip :
    const itemCountByPage = 10;
    const limit = page * itemCountByPage;
    const skip = (page - 1) * itemCountByPage;
    const usersResult = await userModel_1.default.find({
        ...filterQuery, ...searchQuery
    })
        .sort(sortQuery)
        .skip(skip)
        .limit(limit);
    res.send(usersResult);
});
router.delete("/:userId", justAdminUse_1.default, (0, checkId_1.default)("userId"), async (req, res) => {
    const id = req.params.userId;
    await (0, connectToDB_1.default)();
    const userResult = await userModel_1.default.findOneAndDelete({ _id: id }, { new: true });
    if (!userResult)
        return res.status(404).send("User not found to remove");
    const userObj = userResult.toObject();
    delete userObj.password;
    delete userObj.__v;
    res.send({ message: "User removed successfully", user: userObj });
});
router.post("/add", justAdminUse_1.default, checkUserInfo_1.default, async (req, res) => {
    const { name, email, phone, role, password } = req.body;
    if (typeof role !== "string")
        return res.status(400).send("User role is required");
    if (!(0, checkRole_1.default)(role))
        return res.status(400).send("User role is invalid");
    // Check User Email Or Phone Exists :
    const userResult = await userModel_1.default.findOne({ $or: [{ email }, { phone }] });
    if (userResult) {
        if (userResult.email === email)
            return res.status(409).send("User with the email is already exists");
        else
            return res.status(409).send("User with the phone is already exists");
    }
    // Hashed Password :
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    // Add User to DB :
    await userModel_1.default.create({ name, email, phone, password: hashedPassword, role });
    res.status(201).send("User created successfully");
});
router.put("/:userId", justAdminUse_1.default, (0, checkId_1.default)("userId"), checkUserInfo_1.default, async (req, res) => {
    const id = req.params.userId;
    const { name, email, phone, password, role } = req.body;
    if (!(0, checkRole_1.default)(role))
        return res.status(400).send("User role is required or invalid");
    await (0, connectToDB_1.default)();
    const hashedPassword = bcryptjs_1.default.hashSync(password, 10);
    // Is new Email & Phone doesn't user :
    const userExists = await userModel_1.default.findOne({
        $or: [{ email }, { phone }],
        _id: { $ne: new mongoose_1.Types.ObjectId(id) }
    });
    if (userExists)
        return res.status(409).send("User with the email or phone is already exists");
    const userResult = await userModel_1.default.findOneAndUpdate({ _id: id }, { name, email, phone, role, password: hashedPassword }, { new: true });
    if (!userResult)
        return res.status(404).send("User not found to update");
    const userObj = userResult.toObject();
    delete userObj.password;
    delete userObj.__v;
    res.send({ message: "User updated successfully", user: userObj });
});
router.put("/block/:userId", justAdminUse_1.default, (0, checkId_1.default)("userId"), async (req, res) => {
    const id = req.params.userId;
    await (0, connectToDB_1.default)();
    const userResult = await userModel_1.default.findOneAndUpdate({ _id: id, role: { $ne: "ADMIN" } }, [
        { $set: { isBlocked: { $not: "$isBlocked" } } }
    ], { new: true });
    if (!userResult)
        return res.status(404).send("User with the id not found");
    const userObj = userResult.toObject();
    delete userObj.password;
    delete userObj.__v;
    res.send({ message: `User changed to ${userObj.isBlocked ? "blocked" : "unblocked"} status`, user: userObj });
});
exports.default = router;
//# sourceMappingURL=users.js.map