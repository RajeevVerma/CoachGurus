import { uniqueIdGenerator } from "@shared/utils";
import {
  EndeavourCategory,
  UserSignUpSource,
  UserType,
} from "./enums/enumTypes";

// User schema
export interface IUser {
  id: string;
  email?: string;
  name?: string;
  signUpSourceType: UserSignUpSource;
  mobilePhone?: string;
  alternatePhone?: string;
  userType?: UserType;

	/** Auto set on backend */
  signUpDate?: Date;
  lastLoginDate?: Date;
	profilePicUrl?: string;

	profileData?: {
		shortBio?: string;
		description?: string;
		/**store | separeted if multiple */
		certifications?: string; 

		/**coach qualifications | separated*/
		qualifications?: string;
		/**store | separeted if multiple */
		coachingPhotos?: string;
	}

	/** To show any badge  */
	isCoachGuruVerfied?: boolean; 

  phoneOtpVerified?: boolean;  // TODO: Can be indexed
  emailOtpVerified?: boolean;

	/**
	 * Endeavour ids | separated
	 */
	coachingEndeavourIds: string; // 
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
    id: uniqueIdGenerator("user"),
    email,
    name,
    signUpSourceType: UserSignUpSource.Facebook,
    userType: UserType.Guru,
    signUpDate: new Date(),
		coachingEndeavourIds: "1",
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
