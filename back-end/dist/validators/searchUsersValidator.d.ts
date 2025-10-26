import * as yup from "yup";
export type UserFilterProps = "Default" | "Just admins" | "Just users" | "Blocked users" | "Unblocked users";
export type UserSortProps = "Default" | "Sort by maximum bought" | "Sort by minimum bought" | "Sort by highest level" | "Sort by lowest level";
declare const schema: yup.ObjectSchema<{
    search: string | undefined;
    filter: "Default" | "Just admins" | "Just users" | "Blocked users" | "Unblocked users";
    sort: "Default" | "Sort by maximum bought" | "Sort by minimum bought" | "Sort by highest level" | "Sort by lowest level";
    page: number;
}, yup.AnyObject, {
    search: undefined;
    filter: undefined;
    sort: undefined;
    page: undefined;
}, "">;
export default schema;
//# sourceMappingURL=searchUsersValidator.d.ts.map