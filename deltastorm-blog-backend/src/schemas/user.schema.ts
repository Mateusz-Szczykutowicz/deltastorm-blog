//? Imports
import mongoose from "mongoose";
import { userSchemaI } from "../interface/user.interface";

//? User schema to database
const userSchema = new mongoose.Schema<userSchemaI>({
    firstname: { type: String, default: "" },
    secondname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    password: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String, required: true },
    securityID: { type: String, required: true },
    verify: { type: Boolean, default: false },
    avatar: { type: String, default: "" },
});

//? Export
export default mongoose.model<userSchemaI>("User", userSchema);
