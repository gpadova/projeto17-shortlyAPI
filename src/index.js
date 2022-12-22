import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./Routes/authRoutes.js"
import urlsRouter from "./Routes/urlsRoutes.js"
import userRouter from "./Routes/usersRoute.js"
import rankingRoute from "./Routes/rankingRoute.js"
dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())
app.use(authRoutes)
app.use(urlsRouter)
app.use(userRouter)
app.use(rankingRoute)



const PORT = process.env.PORT
app.listen(PORT, () => console.log(`App is running is PORT ${PORT}`))
