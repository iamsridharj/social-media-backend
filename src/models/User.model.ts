import mongoose, { Schema, Document } from "mongoose";
const MongooseSchema = mongoose.Schema;

export interface UserDoc extends Document {
    firstName: string;
    email: string;
    lastName: string;
    password: string;
    crearedAt: Date;
    _id: mongoose.Types.ObjectId;
}

const User = new MongooseSchema({
    firstName: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    lastName: String,
    password: String,
    crearedAt: {
        required: false,
        type: Date,
        default: new Date(),
    }
}, {
    versionKey: false,
});

const UserModel = mongoose.model<UserDoc>('User', User);
export default UserModel;