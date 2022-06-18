// Return an unresized image from the bucket

module.exports = async (fileName, coldBucket, S3) => {
    const fileSplit = fileName.split(".");
    const fileExtension = fileSplit[fileSplit.length - 1];

    const uploaded = await S3.getObject({
        Bucket: coldBucket,
        Key: fileName,
    }).promise();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/" + fileExtension,
            "Content-Disposition": `attachment; filename=${fileName}`,
        },
        body: uploaded.Body?.toString("base64"),
        isBase64Encoded: true,
    };
};
