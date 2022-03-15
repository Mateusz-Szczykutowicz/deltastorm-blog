//? Imports
import express, { Router } from "express";
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth.middleware";
import verify from "../middlewares/verify.middleware";
import { getAvatar } from "../scripts/files.script";

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

//* POST - Add avatar to account
userRouter.post(
    "/avatar",
    getAvatar,
    auth.checkToken,
    verify.isVerify,
    userController.addAvatar
);

//* PATCH - Verify user account
userRouter.patch("/verify", verify.checkCode, userController.verifyUser);

//* PATCH - Change password
userRouter.patch(
    "/password",
    auth.checkToken,
    verify.isVerify,
    userController.changePassword
);

//* PATCH - Change email
userRouter.patch(
    "/email",
    auth.checkToken,
    verify.isVerify,
    userController.changeEmail
);

//* PATCH - Add first name and last name
userRouter.patch(
    "/name",
    auth.checkToken,
    verify.isVerify,
    userController.addFirstAndLastName
);

//* DELETE - Delete user account
userRouter.delete(
    "/",
    auth.checkToken,
    verify.isVerify,
    userController.deleteAccount
);

//? Export
export default userRouter;
