import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.router";
import helmet from "helmet";

const app = express();

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

//? Routers
app.use("/users", userRouter);

export default app;
