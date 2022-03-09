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
        const securityID: string = req.body.security.id;
        const user = await userSchema.findOne(
            { securityID },
            "firstname secondname lastname email id"
        );
        res.status(200).json({ message: "User info", user });
    },
    loginUser: (req, res) => {
        const token: unknown = req.body.security.token;
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
            return res.status(406).json({ message: "Email already used!" });
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
    sendCode: (req, res) => {
        const code: unknown = req.body.security.code;
        console.log("code :>> ", code);
        res.status(200).json({ message: "Code sent" });
    },
    verifyUser: async (req, res) => {
        const email: unknown = req.body.security.email;
        const user = await userSchema.findOne({ email }, "verify");
        if (!user) {
            return res.status(500).json({ message: "Server error" });
        }
        if (user.get("verify")) {
            return res
                .status(400)
                .json({ message: "Account already verified" });
        }
        user.set("verify", true);
        user.save();
        res.status(200).json({ message: "Verify successed" });
    },
};

//? Export
export default userController;
