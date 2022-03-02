import app from "./app";
import config from "./config";
import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(config.dataBase.localhost);
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("DB connection - success");
});

app.listen(config.PORT, () => {
    console.log(`Server listing on port ${config.PORT}`);
});
