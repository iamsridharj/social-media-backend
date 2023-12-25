import express from "express";
import postController from "../services/post/post.service";
import commentController from "../services/post/comment.service";
import wishlistController from "../services/post/wishlist.service";
import verifyToken, { getInfoFromToken } from "../middleware/authentication.middleware";

const router = express.Router();

router.post('/', verifyToken, postController.add);
router.post('/comment', verifyToken, commentController.addComment);
router.post('/wishlist/:action', verifyToken, wishlistController.addToWishlist);

router.get('/all', getInfoFromToken, postController.getAllPost);
router.get('/comments', commentController.getComments);

router.delete('/', getInfoFromToken, postController.deletePost);

export default router;