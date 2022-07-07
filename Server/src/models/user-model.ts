import { tableItemPrefixes as tableItemPrefixes } from "@shared/constants/table-item-prefix";
import { uniqueIdGenerator } from "@shared/utils";
import {
    EndeavourCategory,
    UserSignUpSource,
    UserType,
} from "./enums/enumTypes";
import IdbItemBase from "./shared/dbItemBase";

// User schema
export interface IUser extends IdbItemBase {
    email?: string;
    name?: string;
    city?: string;  // GSI
    signUpSourceType: UserSignUpSource;
    mobilePhone: string;
    alternatePhone?: string;
    userType?: UserType;

    /** Auto set on backend */
    signUpDate?: Date;
    lastLoginDate?: Date;
    profilePicUrl?: string;

    profileData?: {
        shortBio?: string;
        description?: string;
        /**store | separated if multiple */
        certifications?: string;

        /**coach qualifications | separated*/
        qualifications?: string;
        /**store | separated if multiple */
        coachingPhotos?: string;
    };

    /** To show any badge  */
    isCoachGuruVerified?: boolean;

    /* pipe separated */
    locationPks?: string;

    phoneOtpVerified?: boolean; // TODO: Can be indexed
    emailOtpVerified?: boolean;

    /**
     * Endeavour ids | separated
     */
    coachingEndeavourPks: string;
    /** Should be sorted based on priority */
    // endeavourTypes?: EndeavourCategory[];
}

export const getUserPk = (user: IUser): string => {
    if (user.phoneOtpVerified) {
        return user.pk ?? tableItemPrefixes.VerifiedUserPrefix + user.mobilePhone;
    } else {
        // todo: do not save in DB but save in s3 file. client IP/User agent/Device Id
        return user.pk ?? tableItemPrefixes.UnVerifiedUserPrefix + user.mobilePhone;
    }
}

export const getUserSk = (user: IUser): string => {
    return user.email ?? '';
}

/**
 * Get a new User object.
 *
 * @returns
 */
function getNew(name: string, email: string): IUser {
    const phone = '8983879384';
    return {
        pk: tableItemPrefixes.VerifiedUserPrefix + phone,
        sk: phone,
        mobilePhone: phone,
        email,
        name,
        signUpSourceType: UserSignUpSource.Facebook,
        userType: UserType.Guru,
        signUpDate: new Date(),
        coachingEndeavourPks: "E-1",
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
