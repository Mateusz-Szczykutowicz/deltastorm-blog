import md5 from "md5";
import { customAlphabet } from "nanoid";
import config from "../config";
import { userControllerI } from "../interface/user.interface";
import userSchema from "../schemas/user.schema";

const userController: userControllerI = {
    getOne(req, res) {
        res.status(200).json({ message: "OK" });
    },
    async register(req, res) {
        if (!req.body.login || !req.body.password || !req.body.email) {
            return res
                .status(400)
                .json({ message: "Form fields are not valid" });
        }
        const { login, password, email } = req.body;
        const user = await userSchema.findOne({ login });
        if (user) {
            return res.status(406).json({ message: "User already exist" });
        }
        const newUser = new userSchema();
        const nanoid = customAlphabet("1234567890abcdef", 16);
        const id = nanoid();
        newUser.set("login", login);
        newUser.set("password", md5(password + config.security.passwordSalt));
        newUser.set("email", email);
        newUser.set("id", id);
        newUser.set("securityID", md5(`#${id}!${login}`));
        newUser.save();
        res.status(201).json({ message: "User registered - success" });
    },
};

export default userController;
