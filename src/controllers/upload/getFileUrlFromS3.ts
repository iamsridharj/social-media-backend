const getFileUrlFromS3 = (bucketName, fileKey) => `https://${bucketName}.s3.us-east-1.amazonaws.com/${fileKey}`

export default getFileUrlFromS3;
