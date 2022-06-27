import { EndeavourCategory, UserSignUpSource, UserType } from "../enums";

export interface AWSLogins {
    'accounts.google.com'?: string,
    'graph.facebook.com'?: string,
};

export interface IUser {
    id: string;
    email: string;
    name: string;
    SignUpSourceType: UserSignUpSource;
    mobilePhone?: string;
    homePhone?: string;
    userType: UserType;

    signUpDate?: Date;
    lastLoginDate?: Date;

    profilePicUrl?: string;

    /** Should be sorted based on priority */
    endeavourTypes?: EndeavourCategory[];
}