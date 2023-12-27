import express from "express";
import postController from "../services/post/post.service";
import commentController from "../services/post/comment.service";
import wishlistController from "../services/post/wishlist.service";
import verifyToken, { getInfoFromToken } from "../middleware/authentication.middleware";

const router = express.Router();

// Routes for handling Post
router.get('/all', getInfoFromToken, postController.getAllPost);
router.post('/', verifyToken, postController.add);
router.delete('/', getInfoFromToken, postController.deletePost);

// Routes for handling Comments
router.get('/comments', commentController.getComments);
router.post('/comment', verifyToken, commentController.addComment);

// Routes for handling Wishlist
router.post('/wishlist/:action', verifyToken, wishlistController.addToWishlist);


export default router;