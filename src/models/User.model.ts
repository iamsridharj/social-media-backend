import mongoose, { Schema, Document } from "mongoose";

export interface UserDoc extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: mongoose.Types.ObjectId;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: Schema.Types.ObjectId,
        ref: 'File',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    versionKey: false,
    timestamps: true,
});

const UserModel = mongoose.model<UserDoc>('User', UserSchema);
export default UserModel;
