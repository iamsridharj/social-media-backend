import express from "express";
import passport from "passport";
import * as authController from "../services/auth"

const router = express.Router();

router.post('/register', authController.add);
router.post('/login', authController.login)

export default router;