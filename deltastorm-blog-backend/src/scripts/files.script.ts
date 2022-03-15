import multer from "multer";
import fs from "fs";

const upload = multer();

export const getAvatar = upload.single("avatar");

export const writeFile = (
    file: Express.Multer.File,
    path: string,
    type: string
) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    fs.writeFileSync(`${path}/avatar.${type}`, file.buffer);
};
