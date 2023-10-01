import mongoose, { Schema, Document } from "mongoose";
const MongooseSchema = mongoose.Schema;

export interface PostDoc extends Document {
    title: string;
    description: string;
    author: mongoose.Types.ObjectId;
    _id: mongoose.Types.ObjectId;
}



const PostSchema: Schema = new MongooseSchema({
    title: String,
    description: {
        type: String,
        required: true,
    },
    author: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        versionKey: false,
    }
);

const PostModel = mongoose.model<PostDoc>('Post', PostSchema);
export default PostModel;