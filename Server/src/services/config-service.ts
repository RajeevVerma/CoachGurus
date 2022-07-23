import AWS from 'aws-sdk/';

/**
 * Only required for the local not when app is running in Farget container (ECS)
 */
const ACCESS_KEY = 'AKIAY2AYNRZNFMVU4WX7';
const SECRET_KEY = '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';
const BUCKET_NAME = 'coach-gurus-users';
const REGION = 'ap-sourth-1';
const s3 = new AWS.S3();

async function getPresignedUploaUrls(folderName: string, phone: string, contentType: string, fileNames: string[]): Promise<Map<string, string>> {
    if (folderName) {
        //TODO: Is it possible to have it null here?
    }

    let signedUrls = new Map<string, string>();
    for (let i = 0; i < fileNames.length; i++) {
        const s3Params = {
            Bucket: BUCKET_NAME,
            Key: i + '.' + fileNames[i].slice(fileNames[i].lastIndexOf('.')),
            ContentType: contentType,
            ACL: 'public-read',
            Expires: 600 // 10 minutes
        };

        signedUrls.set(s3Params.Key, await s3.getSignedUrlPromise('putObject', s3Params));
    }

    return new Promise((resolve, error) => {
        resolve(signedUrls);
    });
}


async function getPresignedUploaUrl(folderName: string, phone: string, contentType: string, fileName: string): Promise<string> {
    if (folderName) {
        //TODO: Is it possible to have it null here?
    }

    let signedUrls = new Map<string, string>();

    const s3Params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        ContentType: contentType,
        ACL: 'public-read',
        Expires: 600 // 10 minutes
    };

    return await s3.getSignedUrlPromise('putObject', s3Params);
}


export default {
    getPresignedUploaUrls,
    getPresignedUploaUrl
};