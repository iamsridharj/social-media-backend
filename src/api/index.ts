import express from "express";
import authenticationApi from "./auth.api";
import postApi from "./post.api";
import uploadApi from "./upload.api";


const router = express.Router();

router.use("/auth", authenticationApi);
router.use("/post", postApi);
router.use("/upload", uploadApi)

export default router;