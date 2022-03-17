//? Imports
import express, { Router } from "express";
import adminController from "../controllers/admin.controller";
import auth from "../middlewares/auth.middleware";
import verify from "../middlewares/verify.middleware";

//? Express router
const adminRouter: Router = express.Router();

adminRouter.get(
    "/users/:id",
    auth.checkToken,
    verify.isAdmin,
    adminController.getOneUser
);
adminRouter.get(
    "/users",
    auth.checkToken,
    verify.isAdmin,
    adminController.getAllUsers
);
adminRouter.post(
    "/users/block",
    auth.checkToken,
    verify.isAdmin,
    adminController.blockUser
);

adminRouter.delete(
    "/users",
    auth.checkToken,
    verify.isAdmin,
    adminController.deleteUserAccount
);

//? Export
export default adminRouter;
