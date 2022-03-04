import { Request, Response } from "express";

//? User controller interface
export interface userControllerI {
    getOneUser: (req: Request, res: Response) => void;
    registerUser: (req: Request, res: Response) => void;
}
