import {model, Schema} from "mongoose"

const schema = new Schema({
    code: {
        type: String,
        required: true,
        length: 4
    },
    expireTime: {
        type: Number,
        required: true,
    }
})

export default model("OtpModel", schema)