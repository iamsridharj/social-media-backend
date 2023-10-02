import mongoose, { Schema, Document } from "mongoose";
const MongooseSchema = mongoose.Schema;

export interface CommentDoc extends Document {
    comment: string;
    commentedBy: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    _id: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new MongooseSchema({
    comment: String,
    commentedBy: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'User'
    },
    postId: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'Post'
    }
},
    {
        versionKey: false,
    }
);

const CommentModel = mongoose.model<CommentDoc>('Comment', CommentSchema);
export default CommentModel;