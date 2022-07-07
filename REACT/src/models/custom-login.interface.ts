// Import enums
import { UserSignUpSource, UserType } from '../enums';

export interface ICustomLogin {
  phoneNumber: string;
  SignUpSourceType: UserSignUpSource;
  userType: UserType;
}
