import * as yup from "yup"

const passwordValidation = yup.object({
    password: yup.string()
        .required("Password is required")
        .min(8, "password length must be at least 8 characters")
        .max(30, "Password length must be at most 30 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,30}$/, "Password should be includes lowercase, capitalize, number and special characters")
})

export default passwordValidation