
const awsConstants = {

    userProfilePictureBaseUri: 'https://coach-gurus-users.s3.ap-south-1.amazonaws.com/',

    getUserProfilePictureUri: (bucketFolderName?: string, pathKey?: string): string => {
        if (bucketFolderName && pathKey)
            return `${awsConstants.userProfilePictureBaseUri}${bucketFolderName}/${pathKey}`;
        else
            return 'no-image';
    },

    getUserCoachingPictureUri: (bucketFolderName?: string, pathKey?: string): string => {
        if (bucketFolderName && pathKey)
            return `${awsConstants.userProfilePictureBaseUri}${bucketFolderName}/${pathKey}`;
        else
            return 'no-image';
    }
}

export default awsConstants;