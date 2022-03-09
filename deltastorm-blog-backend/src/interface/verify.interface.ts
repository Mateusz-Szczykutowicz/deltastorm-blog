import { NextFunction, Request, Response } from "express";
import { code, email, expressFunction } from "./general.interface";

export interface CodeClassI {
    getCode: () => code;
}

export interface verifyI {
    codes: Map<code, email>;
    setCode: expressFunction;
    checkCode: expressFunction;
    isVerify: expressFunction;
}
