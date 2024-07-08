import postService from "../../services/post/post.service";
import { successHandler } from "../../utils/responseHandlers/responseUtils";

const addPost = async (req, res, next) => {
    try {
        const { user } = req;
        const postDetails = req.body;

        const post = await postService.addPost(user, postDetails);
        successHandler(res, "", post);
    } catch (error) {
        next(error);
    }
};

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await postService.getAllPosts();
        successHandler(res, "", posts);
    } catch (error) {
        next(error);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.query;

        await postService.deletePost(postId);
        successHandler(res, `Post deleted successfully with Id ${postId}`, {});
    } catch (error) {
        next(error);
    }
};

export default {
    addPost,
    getAllPosts,
    deletePost,
};
