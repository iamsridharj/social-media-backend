import mongoose, { Document } from "mongoose";
const MongooseSchema = mongoose.Schema;

export interface FileDoc extends Document {
    _id: mongoose.Types.ObjectId;
    bucketName: String;
    fileKey: String;
    fileType: String;
    fileUrl: String;
}

const File = new MongooseSchema({
    bucketName: {
        required: true,
        type: String
    },
    fileKey: {
        required: true,
        type: String
    },
    fileType: {
        required: true,
        type: String,
    },
    fileUrl: {
        required: true,
        type: String,
    }
}, {
    versionKey: false
})

const FileModel = mongoose.model<FileDoc>('File', File);
export default FileModel;