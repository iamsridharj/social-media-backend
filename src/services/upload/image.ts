import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import randomStringGenerator from "../../utils/randomStringGenerator";
import { successHandler } from "../../utils/responseHandlers/responseUtils";
import getFileUrlFromS3 from "./getFileUrlFromS3";
import FileModel from "../../models/File.model";

const uploadImage = async (req, res, next) => {

    try {
        const { file } = req;

        if (!file) {
            return res.send("BAD")
        }


        const fileName = randomStringGenerator(file.originalname, file.mimetype.split("/")[1])

        const putParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${fileName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };


        const s3 = new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY || '', // store it in .env file to keep it safe
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
            },
            region: process.env.AWS_REGION
        })
        await s3.send(new PutObjectCommand(putParams));

        const imageObject = {
            bucketName: process.env.S3_BUCKET_NAME,
            fileKey: fileName,
            fileType: file.mimetype,
        }

        const fileDoc = new FileModel(imageObject);
        await fileDoc.save()
        const response = fileDoc.toObject();
        response.imageUrl = getFileUrlFromS3(process.env.S3_BUCKET_NAME, fileName)

        successHandler(res, "Uploaded successfully", response)
    } catch (err) {
        next(err)
    }

}

export default {
    uploadImage
}