import * as yup from "yup"

const schema = yup.object({
    email: yup.string()
        .required("Email is required")
        .min(5, "email must be at least 5 characters")
        .max(63, "email must be at most 64 characters")
        .matches(/^[a-z0-9](\.?[a-z0-9]){5,63}@gmail\.com$/, "Email syntax should be almost like this : example_123@gmail.com"),
    password: yup.string()
        .required("Password is required")
        .min(8, "password length must be at least 8 characters")
        .max(30, "Password length must be at most 30 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,30}$/, "Password should be includes lowercase, capitalize, number and special characters")
})

export default schema