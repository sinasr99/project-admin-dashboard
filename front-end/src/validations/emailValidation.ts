import * as yup from "yup"

const emailValidation = yup.object({
    email: yup.string()
        .required("Email is required")
        .min(5, "email must be at least 5 characters")
        .max(63, "email must be at most 64 characters")
        .matches(/^[a-z0-9](\.?[a-z0-9]){5,63}@gmail\.com$/, "Email syntax should be almost like this : example_123@gmail.com")
})

export default emailValidation