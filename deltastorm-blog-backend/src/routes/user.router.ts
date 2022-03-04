//? Imports
import express, { Router } from "express";
import userController from "../controllers/user.controller";

//? Express router
const userRouter: Router = express.Router();

//? Routes
//* GET - Get one user info
userRouter.get("/", userController.getOneUser);
//* POST - Register new user
userRouter.post("/register", userController.registerUser);
//* POST - Login user
userRouter.post("/login");

//? Export
export default userRouter;
