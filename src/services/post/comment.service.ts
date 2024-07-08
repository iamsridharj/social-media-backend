import { ResourceNotFoundError } from "../../utils/errorHandlers/errorClasses";
import PostModel from "../../models/Post.model";
import CommentModel from "../../models/Comment.model";

const addComment = async (postId, userId, comment) => {
    const postDoc = await PostModel.findById(postId).lean();
    if (!postDoc) {
        throw new ResourceNotFoundError("Comment:addComment");
    }

    const commentDoc = await new CommentModel({
        comment,
        commentedBy: userId,
        postId,
    });
    await commentDoc.save();

    postDoc.comments.push(commentDoc._id);
    await PostModel.findByIdAndUpdate(postId, { comments: postDoc.comments });

    return commentDoc;
};

const getComments = async (postId) => {
    if (!postId) {
        throw new ResourceNotFoundError("Comment:getComment");
    }

    return await CommentModel.find({ postId }).lean();
};

export default {
    addComment,
    getComments,
};
