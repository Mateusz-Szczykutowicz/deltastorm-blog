import { Request, Response } from "express";

//? User controller interface

type expressFunction = (req: Request, res: Response<Data>) => void;
interface Data {
    message: string;
    user?: unknown;
    token?: string;
}
export interface userControllerI {
    getOneUser: expressFunction;
    loginUser: expressFunction;
    registerUser: expressFunction;
}

export interface userSchemaI {
    firstname: string;
    secondname: string;
    lastname: string;
    password: string;
    email: string;
    id: string;
    securityID: string;
    verify: boolean;
}
