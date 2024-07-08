import commentService from "../../services/post/comment.service";
import { successHandler } from "../../utils/responseHandlers/responseUtils";

const addComment = async (req, res, next) => {
    try {
        const { postId } = req.query;
        const { userId } = req.user;
        const { comment } = req.body;

        const commentDoc = await commentService.addComment(postId, userId, comment);
        successHandler(res, "Comments saved successfully", commentDoc);
    } catch (error) {
        next(error);
    }
};

const getComments = async (req, res, next) => {
    try {
        const { postId } = req.query;

        const commentDoc = await commentService.getComments(postId);
        successHandler(res, "", commentDoc);
    } catch (error) {
        next(error);
    }
};

export default {
    addComment,
    getComments,
};
