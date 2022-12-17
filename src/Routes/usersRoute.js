import { Router } from "express";
import tokenChecker from "../Controllers/tokenController.js";

const userRouter = Router()

userRouter.get("/user/me", tokenChecker)

export default userRouter