import { ResourceNotFoundError } from "../../utils/errorHandlers/errorClasses";
import User from "../../models/User.model";
import Post from "../../models/Post.model";
import conn from "../../utils/mongo/mongoClient";

const addPost = async (user, postDetails) => {
    const session = await conn.startSession();
    session.startTransaction();

    try {
        const userDoc = await User.findOne({ email: user.email });
        if (!userDoc) {
            throw new ResourceNotFoundError('Post:add: User not found');
        }

        const newPost = new Post({ ...postDetails, author: userDoc._id });
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

        await session.commitTransaction();
        return post;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const getAllPosts = async () => {
    return await Post.find()
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
};

const deletePost = async (postId) => {
    const deletedPost = await Post.findByIdAndDelete(postId);
    if (!deletedPost) {
        throw new ResourceNotFoundError('Post:delete: Post not found');
    }
    return deletedPost;
};

export default {
    addPost,
    getAllPosts,
    deletePost,
};
