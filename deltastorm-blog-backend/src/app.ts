//? Imports
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.router";
import helmet from "helmet";
import path from "path";
import adminRouter from "./routes/admin.router";

//? Express app
const app = express();

//? Express disable
app.disable("x-powered-by");

//? Express settings
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

//? Express static - avatars
app.use(
    "/avatars",
    express.static(path.join(__dirname, "../public/uploads/avatars/"))
);

//? Express dev settings
app.use(morgan("dev"));

//? Routers
app.use("/users", userRouter);
app.use("/admin", adminRouter);

//* Error route
app.use((req: Request, res: Response) => {
    console.log("req.path :>> ", req.path); //* Logs
    res.status(404).json({ message: "Enpoint does not exist" });
});

//? Export
export default app;
