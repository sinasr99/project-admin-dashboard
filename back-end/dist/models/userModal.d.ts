import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "ADMIN" | "USER";
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "ADMIN" | "USER";
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "ADMIN" | "USER";
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "ADMIN" | "USER";
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "ADMIN" | "USER";
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "ADMIN" | "USER";
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=userModal.d.ts.map