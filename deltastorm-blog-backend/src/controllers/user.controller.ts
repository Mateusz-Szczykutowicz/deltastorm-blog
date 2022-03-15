//? Imports
import md5 from "md5";
import { customAlphabet } from "nanoid";
import config from "../config";
import { userControllerI } from "../interface/user.interface";
import userSchema from "../schemas/user.schema";
import { writeFile } from "../scripts/files.script";
import cookie from "cookie";
import path from "path";

//? user controller object
const userController: userControllerI = {
    //* GET - get one user controller
    getOneUser: async (req, res) => {
        const securityID: string = req.body.security.id;
        const user = await userSchema.findOne(
            { securityID },
            "firstname secondname lastname email id"
        );
        res.status(200).json({ message: "User info", user });
    },

    //* POST - Login user
    loginUser: (req, res) => {
        console.log("req.headers.cookie :>> ", req.headers.cookie);
        const expireTime = 15; // Time in minutes
        const token: string = req.body.security.token;
        const cookieToken = cookie.serialize("token", token, {
            maxAge: 60 * expireTime,
            path: "/",
        });

        return res
            .status(200)
            .setHeader("Set-Cookie", cookieToken)
            .json({ message: "Login success", token });
    },

    //* POST - register new user controller
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
        return res.status(201).json({ message: "User registered - success" });
    },
    sendCode: (req, res) => {
        const code: unknown = req.body.security.code;
        console.log("code :>> ", code);
        return res.status(200).json({ message: "Code sent" });
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
        return res.status(200).json({ message: "Verify successed" });
    },
    changePassword: async (req, res) => {
        if (!req.body.password) {
            return res.status(400).json({ message: "Password field is empty" });
        }
        const securityID = req.body.security.id;
        const { password } = req.body;
        const user = await userSchema.findOne({ securityID }, "password");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const hashedPassword = md5(
            `!${password} + ${config.security.passwordSalt}`
        );

        user.set("password", hashedPassword);
        user.save();
        return res.status(200).json({ message: "Password success changed" });
    },
    changeEmail: async (req, res) => {
        const securityID = req.body.security.id;
        const { email } = req.body;
        const existUser = await userSchema.findOne({ email }, "email");
        if (existUser) {
            return res
                .status(409)
                .json({ message: "Email in use, please select another" });
        }
        const user = await userSchema.findOne({ securityID }, "email");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        user.set("email", email);
        user.save();
        return res.status(200).json({ message: "Email successfully changed" });
    },
    deleteAccount: async (req, res) => {
        const securityID = req.body.security.id;
        const user = await userSchema.findOne({ securityID }, "id");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        await user.deleteOne();
        return res
            .status(200)
            .json({ message: "Account successfully deleted" });
    },
    addFirstAndLastName: async (req, res) => {
        if (!req.body.firstName || !req.body.lastName) {
            return res
                .status(400)
                .json({ message: "First name or last name field is empty" });
        }
        const securityID = req.body.security.id;
        const { firstName, lastName, secondName } = req.body;
        const user = await userSchema.findOne({ securityID }, "id");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        user.set("firstname", firstName);
        user.set("lastname", lastName);
        user.set("secondname", secondName || "");
        user.save();
        return res.status(200).json({
            message: "First name, second name and last name successfully added",
        });
    },
    addAvatar: async (req, res) => {
        const securityID = req.body.security.id;
        const avatar = req.file;
        if (!avatar) {
            return res
                .status(500)
                .json({ message: "Upload failed. Something went wrong..." });
        }
        const user = await userSchema.findOne({ securityID }, "id avatar");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const userID: string = user.get("id");
        const avatarName = avatar.originalname.split(".");
        const avatarType = avatarName[avatarName.length - 1];
        const pathDir = path.join(
            __dirname,
            `../../public/uploads/avatars/${userID}`
        );
        writeFile(avatar, pathDir, avatarType);
        user.set("avatar", `/avatars/${userID}/avatar.${avatarType}`);
        user.save();
        return res.status(200).json({
            message: "Avatar successfully upload",
        });
    },
};

//? Export
export default userController;
