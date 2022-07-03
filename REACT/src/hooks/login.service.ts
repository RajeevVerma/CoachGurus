import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types/Auth';
import { ICognitoUser } from '../models';

import { AmplifyService } from './amplify.service';
import { loginHook } from './login-hooks';

const { customLogin, socialLogin } = loginHook();

const amplifyService = new AmplifyService();

export const LoginService = {
  addUnauthorizeCustomUser: async (
    phoneNumber: string,
    countryCode = '+91'
  ) => {
    const session = await amplifyService.signIn(phoneNumber, countryCode);

    return session;
  },
  verifyLogin: async (user: ICognitoUser, otp: string) =>
    await amplifyService.verifyUserSession(user, otp),
  authenticateWithFaceBook: () => {
    amplifyService.federatedIdentityLogin(
      CognitoHostedUIIdentityProvider.Facebook
    );
  },
  authenticateWithGoogle: () => {
    amplifyService.federatedIdentityLogin(
      CognitoHostedUIIdentityProvider.Google
    );
  },
  authenticateWithApple: () => {
    amplifyService.federatedIdentityLogin(
      CognitoHostedUIIdentityProvider.Apple
    );
  },
  getLoggedInUser: (): Promise<ICognitoUser> =>
    amplifyService.getLoggedInUser(),

  logOut: () => amplifyService.logOut(),
};
