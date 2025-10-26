import {Request, Response, NextFunction} from "express"
import {isValidObjectId} from "mongoose";

const checkId = (reqParam: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const id = req.params[reqParam]

        if (!id)
            return res.status(400).send("User id is required")

        if (!isValidObjectId(id))
            return res.status(400).send("User id is invalid")

        next()
    }
}

export default checkId