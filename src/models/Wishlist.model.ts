import mongoose, { Schema, Document } from "mongoose";

export interface WishlistDoc extends Document {
    author: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
}

const WishlistSchema: Schema = new Schema({
    author: {
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

const WishlistModel = mongoose.model<WishlistDoc>('Wishlist', WishlistSchema);
export default WishlistModel;
