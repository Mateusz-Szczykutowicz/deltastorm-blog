//? Imports
import express, { Router } from "express";
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth.middleware";
import verify from "../middlewares/verify.middleware";

//? Express router
const userRouter: Router = express.Router();

//? Routes
//* GET - Get one user info
userRouter.get(
    "/",
    auth.checkToken,
    verify.isVerify,
    userController.getOneUser
);
//* POST - Register new user
userRouter.post("/register", userController.registerUser);
//* POST - Login user
userRouter.post("/login", auth.setToken, userController.loginUser);
//* POST - Send verify code
userRouter.post("/verify", verify.setCode, userController.sendCode);
//* PATCH - Verify user account
userRouter.patch("/verify", verify.checkCode, userController.verifyUser);

//? Export
export default userRouter;
