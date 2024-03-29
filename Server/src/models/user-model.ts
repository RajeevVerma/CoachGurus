import { tableItemPrefixes as tableItemPrefixes } from "@shared/constants/table-item-prefix";
import { uniqueIdGenerator } from "@shared/utils";
import {
    EndeavourCategory,
    UserRole,
    UserSignUpSource,
    UserType,
} from "./enums/enumTypes";
import IdbItemBase from "./shared/dbItemBase";
import randomNumberTimeBased from './../shared/constants/randomGenerator.utility';
import { IAddress } from "./shared";

// User schema
export interface IUser extends IdbItemBase {
    firstName?: string;
    lastName?: string;
    email?: string;
    city?: string;  // GSI
    signUpSourceType: UserSignUpSource;
    mobilePhone: string;
    alternatePhone?: string;
    userType?: UserType;
    userRole?: UserRole;

    /** Auto set on backend */
    signUpDate?: Date;
    lastLoginDate?: Date;
    profilePicUrl?: string;
    coverPicUrl?: string;
    bucketFolderName: string;

    profileData?: {
        shortBio?: string;
        description?: string;
        /**store | separated if multiple */
        certifications?: string;

        /**coach qualifications | separated*/
        qualifications?: string;
        /**store | separated if multiple */
        coachingPhotos?: string;
        finalRatings?: number;
        yearsOfExperience?: number;
    };


    /** To show any badge  */
    isCoachGuruVerified?: boolean;

    /* pipe separated */
    locationPks?: string;

    phoneOtpVerified?: boolean; // TODO: Can be indexed
    emailOtpVerified?: boolean;

    hashKey?: string;

    /**
     * Endeavour ids | separated
     */
    coachingEndeavourPks: string;
    /** Should be sorted based on priority */
    // endeavourTypes?: EndeavourCategory[];
    addresses: IAddress[];
}

function stringToHash(data: string): string {

    var hash = 0;

    if (data.length == 0) return hash.toString();

    for (let i = 0; i < data.length; i++) {
        const char = data.charCodeAt(i);
        hash = ((hash << 3) - hash) + char;
        hash = hash & hash;
    }

    return hash.toString();
}

export const getUserHashKey = (dataKey: string) => {
    return stringToHash(dataKey);
}

export const getUserPk = (user: IUser): string => {
    //if (user.phoneOtpVerified) {
    return user.pk ?? getGeneratedUserPk(user.mobilePhone);
    // } else {
    //     // todo: do not save in DB but save in s3 file. client IP/User agent/Device Id
    //     return user.pk ?? getGeneratedUserPk(user.mobilePhone);
    // }
}

export const getGeneratedUserPk = (phone: string): string => {
    return `${tableItemPrefixes.VerifiedUserPrefix}${phone}`;
}

export const getUserSk = (pk: string): string => {
    return pk;
}

/**
 * Get a new User object. *
 * @returns
 */
function getNew(firstName: string, lastName: string, email: string): IUser {
    const phone = '8983879384';
    return {
        pk: tableItemPrefixes.VerifiedUserPrefix + phone,
        sk: phone,
        mobilePhone: phone,
        email,
        firstName,
        lastName,
        signUpSourceType: UserSignUpSource.Phone,
        userType: UserType.Guru,
        signUpDate: new Date(),
        coachingEndeavourPks: "E-1",
        bucketFolderName: randomNumberTimeBased(tableItemPrefixes.VerifiedUserPrefix + phone).toString(),
        addresses: []
    };
}

/**
 * Copy a user object.
 *
 * @param user
 * @returns
 */
function copy(user: IUser): IUser {
    return { ...user };
}

// Export default
export default {
    new: getNew,
    copy,
};
