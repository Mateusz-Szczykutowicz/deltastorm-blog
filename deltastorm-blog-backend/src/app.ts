//? Imports
import express from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.router";
import helmet from "helmet";

//? Express app
const app = express();

//? Express disable
app.disable("x-powered-by");

//? Express settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

//? Express dev settings
app.use(morgan("dev"));

//? Routers
app.use("/users", userRouter);

//? Export
export default app;
