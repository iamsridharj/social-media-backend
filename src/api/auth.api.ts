import express from "express";
import * as authController from "../services/auth.service"

const router = express.Router();

router.post('/register', authController.add);
router.post('/login', authController.login)

export default router;