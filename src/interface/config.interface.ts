//? Database type
interface dataBaseI {
    localhost: string;
}

//? Security type
interface securityI {
    passwordSalt: string;
    idSalt: string;
    tokenSalt: string;
    expireTime: number;
}

interface mailI {
    host: string;
    port: number;
    login: string;
    password: string;
}

//? Config interface
export interface ConfigI {
    PORT: number;
    dataBase: dataBaseI;
    security: securityI;
    mail: mailI;
}
