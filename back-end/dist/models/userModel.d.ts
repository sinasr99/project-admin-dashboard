import { Schema } from "mongoose";
declare const _default: import("mongoose").Model<{
    name: string;
    phone: string;
    email: string;
    isBlocked: boolean;
    password: string;
    role: "USER" | "ADMIN";
} & import("mongoose").DefaultTimestampProps, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    phone: string;
    email: string;
    isBlocked: boolean;
    password: string;
    role: "USER" | "ADMIN";
} & import("mongoose").DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    name: string;
    phone: string;
    email: string;
    isBlocked: boolean;
    password: string;
    role: "USER" | "ADMIN";
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    phone: string;
    email: string;
    isBlocked: boolean;
    password: string;
    role: "USER" | "ADMIN";
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    phone: string;
    email: string;
    isBlocked: boolean;
    password: string;
    role: "USER" | "ADMIN";
} & import("mongoose").DefaultTimestampProps>, {}, import("mongoose").ResolveSchemaOptions<{
    timestamps: true;
}>> & import("mongoose").FlatRecord<{
    name: string;
    phone: string;
    email: string;
    isBlocked: boolean;
    password: string;
    role: "USER" | "ADMIN";
} & import("mongoose").DefaultTimestampProps> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
//# sourceMappingURL=userModel.d.ts.map