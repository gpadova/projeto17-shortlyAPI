import { Router } from "express";
import insertUserIntoDB from "../Controllers/AuthController/SignUPController";
import validateSignUpBody from "../Middlewares/authMiddleware/validateSingUpBodyMiddleware";
import validateSignInBody from "../Middlewares/authMiddleware/validateSignInMiddleware";

const authRoutes = Router()

authRoutes.post("/signup", validateSignUpBody, insertUserIntoDB)
authRoutes.post("/signin", validateSignInBody, confirmSignIn)

export default authRoutes
