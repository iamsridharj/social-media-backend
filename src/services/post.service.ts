
import { ResourceNotFoundError } from "../utils/errorHandlers/errorClasses";
import User from "../models/User.model";
import Post from "../models/Post.model";
import { successHandler } from "../utils/responseHandlers/responseUtils";


const add = async (req, res, next) => {
    try {
        const { email } = req.user;
        const { title, description } = req.body;

        const userDoc = await User.findOne({ email })
        if (!userDoc) {
            throw new ResourceNotFoundError('Post:add');
        }

        const user = userDoc.toJSON();

        const postDoc = new Post({ title, description, author: user._id });
        await postDoc.save();
        const post = await postDoc.populate({
            path: "author",
            select: "firstName lastName email"
        })
        successHandler(res, "", post)

    } catch (e) {
        next(e)
    }

}

const getAllPost = async (req, res, next) => {
    try {

        const post = await Post.find()
            .populate({
                path: "author",
                select: "firstName lastName email "
            })

        successHandler(res, "", post)

    } catch (e) {
        next(e)
    }
}

export default {
    add,
    getAllPost
}