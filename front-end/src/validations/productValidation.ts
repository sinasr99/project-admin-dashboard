import * as yup from "yup"

const computerAndLaptopValidator = yup.object({
    title: yup.string()
        .required("Product title is required")
        .max(50, "Product max length is 50 characters")
        .min(5, "Product min length is at least 5 characters")
        .matches(/[a-zA-Z]{5,50}/, "Product syntax can be only english characters"),
    price: yup.number()
        .required("Product price is required")
        .min(0, "Product price can't be smaller than 0")
        .max(250_000_000, "Product price can't be bigger than 250,000,000 T"),
    count: yup.number()
        .required("Product count is required")
        .min(0, "Product count can't be smaller than 0")
        .max(10_000, "Product count can't be bigger than 10,000"),
    brand: yup.string()
        .required("Product brand is required")
        .min(3, "Product brand can't be smaller than 3 characters")
        .max(30, "Product brand can't bigger than 30 characters")
        .matches(/^[a-zA-Z]{3,}$/, "Product brand can be only english characters"),
    ram: yup.number()
        .required("Product ram is required")
        .min(1, "Product ram can't be smaller than 1GB")
        .max(1000, "Product ram can't bigger than 1000GB"),
    storage: yup.number()
        .required("Product storage is required")
        .min(256, "Product storage can't be smaller than 256GB")
        .max(20_000, "Product storage can't be bigger than 20,000,000GB"),
    cpu: yup.string()
        .required("Product cpu is required")
        .min(10, "Product cpu can't be smaller than 10 characters")
        .max(75, "Product cpu can't be bigger than 75 characters")
        .matches(/^[a-zA-Z0-9 ]{10,75}$/, "Product cpu can be only english characters")
})

const phoneAndTabletValidator = yup.object({
    title: yup.string()
        .required("Product title is required")
        .max(50, "Product max length is 50 characters")
        .min(5, "Product min length is at least 5 characters")
        .matches(/[a-zA-Z]{5,50}/, "Product syntax can be only english characters"),
    price: yup.number()
        .required("Product price is required")
        .min(0, "Product price can't be smaller than 0")
        .max(250_000_000, "Product price can't be bigger than 250,000,000 T"),
    count: yup.number()
        .required("Product count is required")
        .min(0, "Product count can't be smaller than 0")
        .max(10_000, "Product count can't be bigger than 10,000"),
    brand: yup.string()
        .required("Product brand is required")
        .min(3, "Product brand can't be smaller than 3 characters")
        .max(30, "Product brand can't bigger than 30 characters")
        .matches(/^[a-zA-Z]{3,30}$/, "Product brand can be only english characters"),
    ram: yup.number()
        .required("Product ram is required")
        .min(1, "Product ram can't be smaller than 1GB")
        .max(1000, "Product ram can't bigger than 1000GB"),
    storage: yup.number()
        .required("Product storage is required")
        .min(256, "Product storage can't be smaller than 256GB")
        .max(20_000, "Product storage can't be bigger than 20,000,000GB"),
})

export {computerAndLaptopValidator, phoneAndTabletValidator}