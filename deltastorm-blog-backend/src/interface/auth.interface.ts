import { NextFunction, Request, Response } from "express";

export type token = string;
export type ID = string;

export interface TokenClassI {
    getToken: () => token;
    setToken: (id: ID, securityID: ID) => void;
}

export interface authI {
    tokens: Map<token, ID>;
    checkToken: (req: Request, res: Response, next: NextFunction) => void;
    setToken: (req: Request, res: Response, next: NextFunction) => void;
}
