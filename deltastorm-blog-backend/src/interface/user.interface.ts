import { expressFunction } from "./general.interface";

//? User controller interface
export interface userControllerI {
    getOneUser: expressFunction;
    loginUser: expressFunction;
    registerUser: expressFunction;
    sendCode: expressFunction;
    verifyUser: expressFunction;
    changePassword: expressFunction;
    changeEmail: expressFunction;
    deleteAccount: expressFunction;
    addFirstAndLastName: expressFunction;
    addAvatar: expressFunction;
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
    avatar: string;
}
