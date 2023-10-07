import mongoose, { Schema, Document } from "mongoose";
const MongooseSchema = mongoose.Schema;

export interface WishlistDoc extends Document {
    author: mongoose.Types.ObjectId;
    postId: mongoose.Types.ObjectId;
    _id: mongoose.Types.ObjectId;
}

const WishlistSchema: Schema = new MongooseSchema({
    author: {
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

const WishlistModel = mongoose.model<WishlistDoc>('Wishlist', WishlistSchema);
export default WishlistModel;