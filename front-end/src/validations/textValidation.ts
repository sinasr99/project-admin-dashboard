import * as yup from "yup"

const name = yup.object({
    name: yup.string()
        .required( "name is required")
        .min(3, "name length must be at least 3 characters")
        .max(50, "name length must be at most 50 characters")
})

export default name