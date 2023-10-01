import express from "express";
import postController from "../services/post.service";
import verifyToken from "../middleware/authentication";

const router = express.Router();

router.post('/', verifyToken, postController.add);
router.get('/all', postController.getAllPost);

export default router;