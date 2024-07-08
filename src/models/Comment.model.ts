import mongoose, { Schema, Document } from "mongoose";
import PostModel from "./Post.model";

export interface CommentDoc extends Document {
    comment: string;
    commentedBy: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    commentedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
});


const CommentModel = mongoose.model<CommentDoc>('Comment', CommentSchema);
export default CommentModel;
