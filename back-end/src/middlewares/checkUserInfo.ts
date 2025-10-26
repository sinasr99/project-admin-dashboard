import userValidator from "../validators/userValidation";
import {ValidationError} from "yup";
import {NextFunction, Request, Response} from "express"

const checkUserInfo = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body !== "object") {
        console.log("type => ", typeof req.body)
        return res.status(400).send("Request body is invalid")
    }

    const {name, email, phone, password} = req.body

    // Validation Inputs :
    try {
        userValidator.validateSync({name, email, phone, password}, {abortEarly: false})
        next()
    } catch (err) {
        let errors: string[] = []
        if (err instanceof ValidationError) {
            errors = err.inner.map(err => err.message)
        }

        return res.status(400).send({errors: errors})
    }
}

export default checkUserInfo