//? Imports
import app from "./app";
import config from "./config";
import mongoose from "mongoose";

//? Main function - server database
async function main() {
    await mongoose.connect(config.dataBase.localhost);
}

//? Main function call
main().catch((err: Error) => console.log(err));

//? Database
const db = mongoose.connection;

//? Database start server
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("DB connection - success");
});

//? Express server start
app.listen(config.PORT, () => {
    console.log(`Server listing on port ${config.PORT}`);
});
