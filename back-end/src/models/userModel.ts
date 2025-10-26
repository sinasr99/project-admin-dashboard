import {Schema, model} from "mongoose"

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER",
        required: true
    }
}, {timestamps: true})

export default model("User", schema)