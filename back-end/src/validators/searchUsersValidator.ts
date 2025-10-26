import * as yup from "yup"

export type UserFilterProps = "Default" | "Just admins" | "Just users" | "Blocked users" | "Unblocked users";
export type UserSortProps =
    "Default"
    | "Sort by maximum bought"
    | "Sort by minimum bought"
    | "Sort by highest level"
    | "Sort by lowest level";

const filterOptions: UserFilterProps[] = ["Default", "Just admins", "Just users", "Blocked users", "Unblocked users"];
const sortOptions: UserSortProps[] = ["Default", "Sort by maximum bought", "Sort by minimum bought", "Sort by highest level", "Sort by lowest level"];

const schema = yup.object({
    search: yup.string(),
    filter: yup.string().required("Filter is required").oneOf(filterOptions, "Invalid filter value"),
    sort: yup.string().required("Sort is required").oneOf(sortOptions, "Invalid sort value"),
    page: yup.number().required("Page number is required").positive("Page must be positive").integer("Page must be an integer")
})

export default schema