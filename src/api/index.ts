import express from "express";
import authentication from "./auth.api";


const router = express.Router();

router.use("/auth", authentication);

export default router;