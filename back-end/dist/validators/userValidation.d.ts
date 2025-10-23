import * as yup from "yup";
declare const user: yup.ObjectSchema<{
    name: string;
    phone: string;
    email: string;
    password: string;
}, yup.AnyObject, {
    name: undefined;
    phone: undefined;
    email: undefined;
    password: undefined;
}, "">;
export default user;
//# sourceMappingURL=userValidation.d.ts.map