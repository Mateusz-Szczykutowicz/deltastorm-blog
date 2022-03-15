import { NextFunction, Request, Response } from "express";

export type returnJSON = {
    message: string;
    token?: unknown;
    data?: unknown;
    user?: unknown;
};
export type token = string;
export type ID = string;
export type code = string;
export type email = string;

export type expressFunction = (
    req: Request,
    res: Response<returnJSON>,
    next: NextFunction
) => void;
