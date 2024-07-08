import { ResourceNotFoundError } from "../../utils/errorHandlers/errorClasses";
import PostModel from "../../models/Post.model";
import CommentModel from "../../models/Comment.model";

const addComment = async (postId, userId, comment) => {
    const postDoc = await PostModel.findById(postId);
    if (!postDoc) {
        throw new ResourceNotFoundError("Comment:addComment");
    }

    const commentDoc = await new CommentModel({
        comment,
        commentedBy: userId,
        postId,
    });
    await commentDoc.save();

    const post = postDoc.toObject();
    post.comments.push(commentDoc._id);
    const updatedPostDoc = await PostModel.findByIdAndUpdate(postId, post);
    await updatedPostDoc?.save();

    return commentDoc;
};

const getComments = async (postId) => {
    if (!postId) {
        throw new ResourceNotFoundError("Comment:getComment");
    }

    return await CommentModel.find({ postId });
};

export default {
    addComment,
    getComments,
};
