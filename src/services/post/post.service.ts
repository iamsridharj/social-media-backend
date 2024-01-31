import { ResourceNotFoundError } from "../../utils/errorHandlers/errorClasses";
import User from "../../models/User.model";
import Post from "../../models/Post.model";
import { successHandler } from "../../utils/responseHandlers/responseUtils";
import conn from "../../utils/mongo/mongoClient";

const add = async (req, res, next) => {
    const session = await conn.startSession();
    try {
        session.startTransaction();
        const { email } = req.user;
        const { title, description, postType, objects } = req.body;

        const userDoc = await User.findOne({ email });
        if (!userDoc) {
            throw new ResourceNotFoundError('Post:add: User not found');
        }

        const user = userDoc.toJSON();

        const newPost = new Post({ title, description, postType, author: user._id, objects });
        await newPost.save();

        const post = await Post.findById(newPost._id)
            .populate({
                path: "author",
                select: "firstName lastName email profileImage",
                populate: { path: 'profileImage', populate: 'fileUrl' }
            })
            .populate({
                path: "comments",
                populate: [
                    {
                        path: "commentedBy",
                        select: "firstName lastName",
                    },
                ]
            })
            .populate({
                path: "objects",
                populate: [
                    {
                        path: "fileUrl"
                    },
                ]
            });

        session.commitTransaction();
        successHandler(res, "", post);
    } catch (e) {
        session.abortTransaction();
        next(e);
    } finally {
        session.endSession();
    }
};

const getAllPost = async (req, res, next) => {
    try {
        const userId = req?.user?.userId || '';

        const posts = await Post.find()
            .populate({
                path: "author",
                select: "firstName lastName email profileImage", 
                populate: { path: 'profileImage', populate: 'fileUrl' }
            })
            .populate({
                path: "comments",
                populate: [
                    {
                        path: "commentedBy",
                        select: "firstName lastName"
                    },
                ]
            })
            .populate({
                path: "objects",
                populate: [
                    {
                        path: "fileUrl"
                    },
                ]
            });

        successHandler(res, "", posts);
    } catch (e) {
        next(e);
    }
};

const deletePost = async (req, res, next) => {
    try {
        const { postId } = req.query;

        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            throw new ResourceNotFoundError('Post:delete: Post not found');
        }

        successHandler(res, `Post deleted successfully with Id ${postId}`, {});
    } catch (e) {
        next(e);
    }
};

export default {
    add,
    getAllPost,
    deletePost,
};
