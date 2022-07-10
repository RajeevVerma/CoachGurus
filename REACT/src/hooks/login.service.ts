import { ICognitoUser } from '../models';
import { AmplifyService } from './amplify.service';
import { AwsServiceHook } from './aws-hooks';

const { customLogin, socialLogin } = AwsServiceHook();

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
