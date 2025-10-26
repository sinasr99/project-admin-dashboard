import * as yup from "yup"

const schema = yup.object({
    code: yup.string()
        .required("Code is required")
        .length(4, "Code must be 4 characters")
        .matches(/^\d{4}$/, "Code must be number")
})

export default schema