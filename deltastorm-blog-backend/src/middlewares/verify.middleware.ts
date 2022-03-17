import Code from "../classes/code.class";
import Mail from "../classes/mail.class";
import { code, email } from "../interface/general.interface";
import { verifyI } from "../interface/verify.interface";
import userSchema from "../schemas/user.schema";

const verify: verifyI = {
    //* MAP - all codes
    codes: new Map<code, email>(),
    setCode: async (req, res, next) => {
        if (!req.body.email) {
            return res.status(400).json({ message: "Email field is empty" });
        }
        const { email } = req.body;
        const user = await userSchema.findOne({ email }, "email");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const code = new Code();
        verify.codes.set(code.getCode(), email);
        req.body.security = {};
        req.body.security.code = code.getCode();
        const mail = new Mail(
            email,
            "Verify your account",
            `<h1>Hello - your code: ${code.getCode()}</h1>`
        );
        mail.sendMail();
        setTimeout(() => {
            verify.codes.delete(code.getCode());
        }, 1000 * 60 * 5); //? 5 minutes expire code
        return next();
    },

    //* Check code to verify account
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
        return next();
    },

    //* Check account, that is verified
    isVerify: async (req, res, next) => {
        const securityID = req.body.security.id;
        const user = await userSchema.findOne({ securityID }, "verify");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (!user.get("verify")) {
            return res.status(403).json({ message: "Verify account" });
        }
        return next();
    },

    //* Check account, that is blocked
    isBlocked: async (req, res, next) => {
        const securityID = req.body.security.id;
        const user = await userSchema.findOne({ securityID }, "blocked");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (user.get("blocked")) {
            return res.status(403).json({ message: "Account is blocked" });
        }
        return next();
    },

    //* Check account, that is admin
    isAdmin: async (req, res, next) => {
        const securityID = req.body.security.id;
        const user = await userSchema.findOne({ securityID }, "admin");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (user.get("admin")) {
            return next();
        }
        return res.status(403).json({ message: "Prohibited content" });
    },
};

export default verify;
