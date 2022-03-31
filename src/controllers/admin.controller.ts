import { adminControllerI } from "../interface/admin.interface";
import userSchema from "../schemas/user.schema";

const adminController: adminControllerI = {
    getOneUser: async (req, res) => {
        const { id } = req.params;
        const user = await userSchema.findOne({ id });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        return res.status(200).json({ message: "User info", user });
    },
    getAllUsers: async (req, res) => {
        const users = await userSchema.find(
            { admin: false },
            "id email firstname lastname"
        );
        res.status(200).json({ message: "All users", data: users });
    },
    blockUser: async (req, res) => {
        const { id } = req.body;
        const user = await userSchema.findOne({ id });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        user.set("blocked", true);
        user.save();
        return res.status(200).json({ message: "User successfully blocked" });
    },
    deleteUserAccount: async (req, res) => {
        const { id } = req.body;
        const user = await userSchema.findOne({ id }, "id");
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const response = await user.deleteOne();
        console.log("response :>> ", response);
        if (response) {
            return res
                .status(200)
                .json({ message: "User successfully deleted" });
        }
        return res.status(500).json({ message: "Internal server error" });
    },
};

export default adminController;
