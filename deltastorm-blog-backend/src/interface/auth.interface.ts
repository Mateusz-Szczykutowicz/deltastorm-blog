import { expressFunction, ID, token } from "./general.interface";

export interface TokenClassI {
    getToken: () => token;
    setToken: (id: ID, securityID: ID) => void;
}

export interface authI {
    tokens: Map<token, ID>;
    checkToken: expressFunction;
    setToken: expressFunction;
    deleteToken: (id: ID) => void;
}
