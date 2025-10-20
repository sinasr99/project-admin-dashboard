import {Category} from "./Product.T";

type DiscountCodeCountProps = {
    title: string,
    status: "Expired" | "Valid",
    creator: string,
    category: Category | "All"
    expireType: "count",
    expireCount: number
}
type DiscountCodeDateProps = {
    title: string,
    status: "Expired" | "Valid",
    creator: string,
    category: Category | "All"
    expireType: "date",
    expireDate: number
}
export type DiscountCodeProps = DiscountCodeCountProps | DiscountCodeDateProps