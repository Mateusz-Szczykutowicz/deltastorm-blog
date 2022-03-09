import Code from "../classes/code.class";
import { code, email } from "../interface/general.interface";
import { verifyI } from "../interface/verify.interface";
import userSchema from "../schemas/user.schema";

const verify: verifyI = {
    codes: new Map<code, email>(),
    setCode: (req, res, next) => {
        if (!req.body.email) {
            return res.status(400).json({ message: "Email field is empty" });
        }
        const { email } = req.body;
        const code = new Code();
        verify.codes.set(code.getCode(), email);
        req.body.security = {};
        req.body.security.code = code.getCode();
        next();
    },
    checkCode: (req, res, next) => {
        if (!req.body.code) {
            return res.status(400).json({ message: "Code field is empty" });
        }
        const { code } = req.body;
        const email = verify.codes.get(code);
        if (!email) {
            return res.status(403).json({ message: "Wrong code" });
        }
        req.body.security = {};
        req.body.security.email = email;
        next();
    },
    isVerify: async (req, res, next) => {
        const securityID = req.body.security.id;
        console.log("securityID :>> ", securityID);
        const user = await userSchema.findOne({ securityID }, "verify");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (!user.get("verify")) {
            return res.status(403).json({ message: "Verify account" });
        }
        next();
    },
};

export default verify;
