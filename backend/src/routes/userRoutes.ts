import { Router } from "express";
import { getAllUser, login, signUp, verifyUser } from "../controllers/userController.js";
import { loginValidator, signupValidator, validate } from "../utils/validator.js";
import { verifyToken } from "../utils/tokenMange.js";

const userRouter=Router();
userRouter.get("/",getAllUser)
userRouter.post("/signup",validate(signupValidator), signUp);
userRouter.post("/login",validate(loginValidator), login);

userRouter.get("/verifyUser",verifyToken,verifyUser)

export default userRouter;