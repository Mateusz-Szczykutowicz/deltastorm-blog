import { expressFunction } from "./general.interface";

export interface adminControllerI {
    getOneUser: expressFunction;
    getAllUsers: expressFunction;
    blockUser: expressFunction;
    deleteUserAccount: expressFunction;
}
