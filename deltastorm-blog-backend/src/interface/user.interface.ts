import { Request, Response } from "express";

export interface userControllerI {
    getOne: (req: Request, res: Response) => void;
    register: (req: Request, res: Response) => void;
}
