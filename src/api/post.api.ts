import express from "express";
import postController from "../services/post.service";
import commentController from "../services/comment.service";
import verifyToken from "../middleware/authentication";

const router = express.Router();

router.post('/', verifyToken, postController.add);
router.post('/comment', verifyToken, commentController.addComment);

router.get('/all', postController.getAllPost);
router.get('/comments', commentController.getComments);

export default router;