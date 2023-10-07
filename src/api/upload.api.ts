import express from "express";
import multerClient from "../middleware/multer.middleware";
import imageService from "../services/upload/image";

const router = express.Router();

router.post('/image', multerClient.single('file'), imageService.uploadImage);

export default router;