import * as yup from "yup";
declare const schema: yup.ObjectSchema<{
    search: string;
    filter: string;
    sort: string;
    page: number;
}, yup.AnyObject, {
    search: undefined;
    filter: undefined;
    sort: undefined;
    page: undefined;
}, "">;
export default schema;
//# sourceMappingURL=searchValidator.d.ts.map