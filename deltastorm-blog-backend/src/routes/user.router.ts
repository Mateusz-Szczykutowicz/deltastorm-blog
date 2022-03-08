//? Imports
import express, { Router } from "express";
import userController from "../controllers/user.controller";
import auth from "../middlewares/auth.middleware";

//? Express router
const userRouter: Router = express.Router();

//? Routes
//* GET - Get one user info
userRouter.get("/", auth.checkToken, userController.getOneUser);
//* POST - Register new user
userRouter.post("/register", userController.registerUser);
//* POST - Login user
userRouter.post("/login", auth.setToken, userController.loginUser);

//? Export
export default userRouter;
