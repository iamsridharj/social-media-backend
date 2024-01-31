import mongoose, { Document } from "mongoose";
const MongooseSchema = mongoose.Schema;

export interface UserDoc extends Document {
    firstName: string;
    email: string;
    lastName: string;
    password: string;
    crearedAt: Date;
    profileImage: mongoose.Types.ObjectId; 
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
    profileImage: {
        type: MongooseSchema.Types.ObjectId,
        ref: 'File'
    },
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