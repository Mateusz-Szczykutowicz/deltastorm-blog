import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String, default: "" },
    secondname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    login: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    id: { type: String, required: true },
    securityID: { type: String, required: true },
    verify: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
