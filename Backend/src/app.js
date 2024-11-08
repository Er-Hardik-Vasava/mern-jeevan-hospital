import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    credentials: true
}))

app.use(express.json({ extended: true, limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())


import userRouter from "./routes/user.route.js"
import messageRouter from "./routes/message.route.js"
import appointmentRouter from "./routes/appointment.route.js"


app.use("/api/v1/user", userRouter)
app.use("/api/v1/message", messageRouter)
app.use("/api/v1/appointment", appointmentRouter)



export { app }