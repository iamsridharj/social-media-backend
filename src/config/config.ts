import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.join(__dirname, `${process.env.NODE_ENV}.env`)
});

const config = {
    PORT: process.env.PORT,
    ENV: process.env.NODE_ENV,
}

export default config;