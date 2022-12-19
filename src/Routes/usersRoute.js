import { Router } from "express";
import tokenChecker from "../Controllers/tokenController.js";
import getUsersCount from "../Controllers/UsersController/getUsersController.js";

const userRouter = Router()

userRouter.get("/users/me", tokenChecker, getUsersCount)

export default userRouter