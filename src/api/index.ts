import express from "express";
import authentication from "./auth";


const router = express.Router();

router.use("/auth", authentication);

export default router;