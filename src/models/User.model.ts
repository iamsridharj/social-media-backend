import Mongoose from "mongoose";

const UserSchema = new  Mongoose.Schema({
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
});

const User = Mongoose.model('User', UserSchema);
export default User;