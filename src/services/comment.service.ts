import { BadRequest, ResourceNotFoundError } from "../utils/errorHandlers/errorClasses";
import PostModel from "../models/Post.model";
import CommentModel from "../models/Comment.model";
import { successHandler } from "../utils/responseHandlers/responseUtils";

const addComment = async (req, res, next) => {
    try {
        const { postId } = req.query;
        const { userId } = req.user;

        console.log({
            postId
        })
        const postDoc = await PostModel.findById(postId);

        if (!postDoc) {
            throw new ResourceNotFoundError("Comment:addComment")
        }


        const { comment } = req.body;
        const commentDoc = await new CommentModel({
            comment,
            authorId: userId,
            postId,
        });
        await commentDoc.save();
        successHandler(res, "comments saved successfully", commentDoc)

    } catch (error) {
        next(error)
    }

}

const getComments = async (req, res, next) => {
    try {
        const { postId } = req.query;


        if (!postId) {
            throw new BadRequest("Comment:getComment")
        }


        const commentDoc = await CommentModel.find({
            postId,
        });
        successHandler(res, "", commentDoc)

    } catch (error) {
        next(error)
    }
}

export default {
    addComment,
    getComments
}