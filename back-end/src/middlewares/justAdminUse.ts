import {NextFunction, Request, Response} from "express"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import connectToDB from "../helperFunctions/connectToDB";
import userModel from "../models/userModel";

dotenv.config()

const justAdminUse = async (req: Request, res: Response, next: NextFunction) => {
    const {token} = req.headers

    if (typeof token !== "string")
        return res.status(401).send("User is not authorized")

    let email = ""

    try {
        const tokenResult: any = jwt.verify(token, process.env.tokenKey || "")
        email = tokenResult?.email || ""
    } catch (error) {
        return res.status(401).send("User is not authorized")
    }

    await connectToDB()

    const userResult = await userModel.findOne({email})

    if (!userResult || userResult.role !== "ADMIN")
        return res.status(403).send("User doesn't have access permission")


    next()
}

export default justAdminUse