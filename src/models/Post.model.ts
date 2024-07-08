import mongoose, { Schema, Document } from "mongoose";

export interface PostDoc extends Document {
    title: string;
    description: string;
    postType: 'video' | 'gallery' | 'image';
    author: mongoose.Types.ObjectId;
    comments: mongoose.Types.ObjectId[];
    objects: mongoose.Types.ObjectId[];
    isInWishlist: boolean;
}

const PostSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postType: {
        type: String,
        required: true,
        enum: ['video', 'gallery', 'image'],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    objects: [{
        type: Schema.Types.ObjectId,
        ref: 'File',
    }],
    isInWishlist: {
        type: Boolean,
        default: false,
    },
    commentCount: {
        type: Number,
        default: 0,
    }
}, {
    versionKey: false,
    timestamps: true,
});

const PostModel = mongoose.model<PostDoc>('Post', PostSchema);
export default PostModel;
