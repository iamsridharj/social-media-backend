import express from "express";
import * as authController from "../services/auth.service"

const router = express.Router();

router.post('/', authController.add);

export default router;