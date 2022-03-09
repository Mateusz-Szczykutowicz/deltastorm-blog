import { customAlphabet } from "nanoid";
import { code } from "../interface/general.interface";
import { CodeClassI } from "../interface/verify.interface";

class Code implements CodeClassI {
    private code: code;
    public constructor() {
        const nanoid = customAlphabet("abcdef1234567890", 12);
        this.code = nanoid();
    }
    public getCode(): code {
        return this.code;
    }
}

export default Code;
