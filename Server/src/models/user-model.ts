import { uniqueIdGenerator } from "@shared/utils";
import { EndeavourCategory, UserSignUpSource, UserType } from "./enums/enumTypes";

// User schema
export interface IUser {
    id: string;
    email: string;
    name: string;
    signUpSourceType: UserSignUpSource;
    mobilePhone?: string;
    homePhone?: string;
    userType: UserType;

    signUpDate?: Date;
    lastLoginDate?: Date;

    profilePicUrl?: string;

    /** Should be sorted based on priority */
   // endeavourTypes?: EndeavourCategory[];
}

/**
 * Get a new User object.
 * 
 * @returns 
 */
function getNew(name: string, email: string): IUser {
    return {
        id: uniqueIdGenerator('user'),
        email,
        name,
        signUpSourceType: UserSignUpSource.Facebook,
        userType: UserType.Guru,
        signUpDate: new Date(),
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
}
