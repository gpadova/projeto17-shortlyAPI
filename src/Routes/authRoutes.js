import { Router } from "express";
import insertUserIntoDB from "../Controllers/AuthController/SignUPController.js";
import validateSignUpBody from "../Middlewares/authMiddleware/validateSingUpBodyMiddleware.js";
import validateSignInBody from "../Middlewares/authMiddleware/validateSignInMiddleware.js";
import confirmSignIn from "../Controllers/AuthController/SignInController.js";

const authRoutes = Router()

authRoutes.post("/signup", validateSignUpBody, insertUserIntoDB)
authRoutes.post("/signin", validateSignInBody, confirmSignIn)

export default authRoutes
