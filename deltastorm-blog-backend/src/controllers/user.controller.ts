//? Imports
import md5 from "md5";
import { customAlphabet } from "nanoid";
import config from "../config";
import { userControllerI } from "../interface/user.interface";
import userSchema from "../schemas/user.schema";

//? user controller object
const userController: userControllerI = {
    //? GET - get one user controller
    getOneUser: async (req, res) => {
        const securityID: string = req.body.security.securisecurityID;
        const user = await userSchema.findOne({ securityID });
        res.status(200).json({ message: "User info", user });
    },
    loginUser: (req, res) => {
        const token = req.body.security.token;
        return res.status(200).json({ message: "Login success", token });
    },
    //? POST - register new user controller
    registerUser: async (req, res) => {
        if (!req.body.password || !req.body.email) {
            return res
                .status(400)
                .json({ message: "Form fields are not valid" });
        }
        const { password, email } = req.body;
        const user = await userSchema.findOne({ email });
        if (user) {
            return res.status(406).json({ message: "User already exist" });
        }
        const newUser = new userSchema();
        const nanoid = customAlphabet("1234567890abcdef", 16);
        const id = nanoid();
        newUser.set(
            "password",
            md5(`!${password} + ${config.security.passwordSalt}`)
        );
        newUser.set("email", email);
        newUser.set("id", id);
        newUser.set(
            "securityID",
            md5(`#${id}!${email}+${config.security.idSalt}`)
        );
        newUser.save();
        res.status(201).json({ message: "User registered - success" });
    },
};

//? Export
export default userController;
