import mongoose, { Schema, Document } from "mongoose";
const MongooseSchema = mongoose.Schema;

export interface PostDoc extends Document {
    title: string;
    description: string;
    postType: string,
    author: mongoose.Types.ObjectId;
    comments: [mongoose.Types.ObjectId];
    isInWishlist: Boolean;
    _id: mongoose.Types.ObjectId;
}



const PostSchema: Schema = new MongooseSchema({
    title: String,
    postType: {
        type: String,
        required: true,
        enum: ['video', 'gallery', 'image'] as const, 
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: MongooseSchema.Types.ObjectId,
        ref: 'Comment'
    }],
    objects:[{
        type: MongooseSchema.Types.ObjectId,
        ref: 'File'
    }],
    isInWishlist: MongooseSchema.Types.Boolean
    },
    {
        versionKey: false,
    }
);

const PostModel = mongoose.model<PostDoc>('Post', PostSchema);
export default PostModel;