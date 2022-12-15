import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./Routes/authRoutes"
dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())
app.use(authRoutes)


const PORT = 4000 || proces.env.PORT
app.listen(PORT, () => console.log(`App is running is PORT ${PORT}`))
