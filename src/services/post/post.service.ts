
import { ResourceNotFoundError } from "../../utils/errorHandlers/errorClasses";
import User from "../../models/User.model";
import Post, { PostDoc } from "../../models/Post.model";
import { successHandler } from "../../utils/responseHandlers/responseUtils";
import conn from "../../utils/mongo/mongoClient";

const add = async (req, res, next) => {
    const session = await conn.startSession();
    try {
        session.startTransaction();
        const { email, userId } = req.user;
        const { title, description } = req.body;

        const userDoc = await User.findOne({ email })
        if (!userDoc) {
            throw new ResourceNotFoundError('Post:add');
        }

        const user = userDoc.toJSON();

        const postDoc = new Post({ title, description, author: user._id });
        await postDoc.save();
        let post = await postDoc
            .populate({
                path: "author comments",
            });
        session.commitTransaction();
        successHandler(res, "", post)

    } catch (e) {
        session.abortTransaction();
        next(e)
    } finally {
        session.endSession();
    }

}

const getAllPost = async (req, res, next) => {
    try {

        const userId = req?.user?.userId || '';

        let posts = await Post.find()
            .populate({
                path: "author",
                select: "firstName lastName email"
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


        successHandler(res, "", posts)

    } catch (e) {
        next(e)
    }
}

export default {
    add,
    getAllPost
}