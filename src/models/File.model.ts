import mongoose, { Schema, Document } from "mongoose";

export interface FileDoc extends Document {
    bucketName: string;
    fileKey: string;
    fileType: string;
    fileUrl: string;
}

const FileSchema: Schema = new Schema({
    bucketName: {
        type: String,
        required: true,
    },
    fileKey: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    }
}, {
    versionKey: false,
    timestamps: true,
});

const FileModel = mongoose.model<FileDoc>('File', FileSchema);
export default FileModel;
