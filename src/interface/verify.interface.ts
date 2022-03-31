import { code, email, expressFunction } from "./general.interface";

export interface CodeClassI {
    getCode: () => code;
}

export interface verifyI {
    codes: Map<code, email>;
    setCode: expressFunction;
    checkCode: expressFunction;
    isVerify: expressFunction;
    isBlocked: expressFunction;
    isAdmin: expressFunction;
}
