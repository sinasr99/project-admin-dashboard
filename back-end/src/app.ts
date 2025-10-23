// Core Modules :
import path from "path"

// Third Modules :
import dotenv from "dotenv"
import express from "express"

// Local Modules :
    // Route Modules :
import authRoute from "./routes/auth"

dotenv.config({path: path.resolve(__dirname, ".env")})

const app = express()

// Global Middlewares :
app.use(express.json())

// Routes :
app.use("/auth", authRoute)


// Server run :
app.listen(process.env.port, () => console.log(`Server run on port ${process.env.port}`))