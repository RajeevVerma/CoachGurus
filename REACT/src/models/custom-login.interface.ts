// Import enums
import { UserSignUpSource, UserType } from '../enums';

export interface ICustomLogin {
  email?: string;
  phoneNumber: string;
  SignUpSourceType: UserSignUpSource;
  userType: UserType;
}
