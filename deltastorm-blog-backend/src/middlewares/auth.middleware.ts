import md5 from "md5";
import { Token } from "../classes/token.class";
import config from "../config";
import { authI } from "../interface/auth.interface";
import userSchema from "../schemas/user.schema";

const auth: authI = {
    tokens: new Map(),
    checkToken: async (req, res, next) => {
        const token = req.headers.token;
        if (!token) {
            return res.status(400).json({ message: "Token does not exist" });
        }
        const securityID = auth.tokens.get(token.toString());
        if (!securityID) {
            return res.status(401).json({
                message: "You have been logged out. Please log in again",
            });
        }
        req.body.security = {};
        req.body.security.id = securityID;
        return next();
    },
    setToken: async (req, res, next) => {
        if (!req.body.email || !req.body.password) {
            return res
                .status(400)
                .json({ message: "Field login or password is empty" });
        }
        const { email, password } = req.body;
        const hashedPassword = md5(
            `!${password} + ${config.security.passwordSalt}`
        );
        const user = await userSchema.findOne(
            {
                password: hashedPassword,
                email,
            },
            "securityID"
        );
        if (!user) {
            return res.status(404).json({ message: "Wrong login or password" });
        }
        const securityID: string = user.get("securityID");
        const token = new Token();
        token.setToken(securityID);
        auth.tokens.set(token.getToken(), securityID);
        req.body.security = {};
        req.body.security.token = token.getToken();
        setTimeout(() => {
            auth.tokens.delete(token.getToken());
        }, 1000 * 60 * 15);
        return next();
    },
    deleteToken: (id) => {
        auth.tokens.delete(id);
    },
};

export default auth;
