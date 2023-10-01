import express from "express";
import authentication from "./auth.api";
import post from "./post.api";


const router = express.Router();

router.use("/auth", authentication);
router.use("/post", post);

export default router;