import Mongoose from "mongoose";

const PostSchema = new Mongoose.Schema({
    title: String,
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const PostModel = Mongoose.model('Post', PostSchema);
export default PostModel;