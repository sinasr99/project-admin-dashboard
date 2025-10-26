import {connect} from "mongoose"
import dotenv from "dotenv"
import path from "path";

dotenv.config()

const connectToDB = async () => {
    try {
        await connect(process.env.dbUrl as string)
        console.log(`Server connected to db with the url : ${process.env.dbUrl}`)
    }catch (error) {
        console.log(`error connect to database :\n`, error)
    }
}

export default connectToDB