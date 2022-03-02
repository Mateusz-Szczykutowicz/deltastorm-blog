interface dataBaseI {
    localhost: string;
}

interface securityI {
    passwordSalt: string;
    idSalt: string;
}
export interface ConfigI {
    PORT: number;
    dataBase: dataBaseI;
    security: securityI;
}
