import * as yup from "yup"

const schema = yup.object({
    phone: yup.string()
        .required("Phone number is required")
        .matches(/^09\d{9}$/, "Phone number should be like this: 09056408490"),
})

export default schema