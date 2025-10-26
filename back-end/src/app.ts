// Core Modules :

// Third Modules :
import dotenv from "dotenv"
import express, {NextFunction, Request, Response} from "express"

// Local Modules :
    // Route Modules :
import authRoute from "./routes/auth"
import usersRoute from "./routes/users"

dotenv.config()

const app = express()

// Global Middlewares :
app.use(express.json())


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
   switch (err.status) {
       case 400: {
           return res.status(400).send("Request body is invalid")
       }
       default: {
           return res.status(500).send({message: "Server error", error: err.message})
       }
   }
})

// Routes :
app.use("/auth", authRoute)
app.use("/users", usersRoute)

    // Not found route :
app.use(async (req, res) => {
    res.status(404).send("API route not found")
})

// Server run :
app.listen(process.env.port, () => console.log(`Server run on port ${process.env.port}`))