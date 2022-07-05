import { UserSignUpSource, UserType } from '../enums';
import { ICognitoUser } from '../models';
import { AmplifyService } from './amplify.service';
import { loginHook } from './login-hooks';

const { customLogin, socialLogin } = loginHook();

const amplifyService = new AmplifyService();

export function LoginService() {
  const addUnauthorizeCustomUser = async (
    phoneNumber: string,
    countryCode = '+91'
  ) => {
    const session = await amplifyService.signIn(phoneNumber, countryCode);

    return session;
  };

  const verifyLogin = async (user: ICognitoUser, otp: string) =>
    await amplifyService.verifyUserSession(user, otp);

  const getLoggedInUser = (): Promise<ICognitoUser> =>
    amplifyService.getLoggedInUser();

  const logOut = () => amplifyService.logOut();

  return {
    logOut,
    getLoggedInUser,
    verifyLogin,
    addUnauthorizeCustomUser,
  };
}
