import { UserSignUpSource, UserType } from 'enums';
import { UserRole } from 'enums/login.enum';
import { IAddress } from './address.model';

export interface IResponse {
    Item: IUser;
}

export interface IUser {
    firstName?: string;
    lastName?: string;
    email?: string;
    city?: string; // GSI
    signUpSourceType: UserSignUpSource;
    mobilePhone: string;
    alternatePhone?: string;
    userType?: UserType;
    userRole?: UserRole;

    /** Auto set on backend */
    signUpDate?: Date;
    lastLoginDate?: Date;
    profilePicUrl?: string;
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

    /**
     * Endeavour ids | separated
     */
    coachingEndeavourPks: string;
    /** Should be sorted based on priority */
    // endeavourTypes?: EndeavourCategory[];
    addresses?: IAddress[];
}

export interface IFile {
    extension: string;
    id: string;
    preview: {
        type: string;
        url: string;
    };
    size: number;
    type: string;
}

export interface IUserProfile {
    user?: IUser,
    addresses?: IAddress[]
}