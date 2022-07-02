import { Auth } from '@aws-amplify/auth';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types/Auth';
import { v4, v5 } from 'uuid';
import { ICognitoError, ICognitoUser } from '../models';
import { loginHook } from './login-hooks';

const { customLogin } = loginHook();

export class AmplifyService {
  /**
   *
   * @param phoneNumber
   * @param countryCode
   * @returns
   */
  private signUp = async (phoneNumber: string, countryCode: string) => {
    await Auth.signUp({
      username: `${countryCode}${phoneNumber}`,
      password: `${v4()}${Math.random()}`,
      attributes: {
        phone_number: `${countryCode}${phoneNumber}`,
      },
    }).then(() => this.signIn(phoneNumber, countryCode));
  };

  public signIn = async (
    phoneNumber: string,
    countryCode: string
  ): Promise<ICognitoUser | undefined> => {
    return new Promise(async (resolve: (user?: ICognitoUser) => void) => {
      await Auth.signIn(`${countryCode}${phoneNumber}`)
        .then((result: ICognitoUser) => {
          resolve(result);
        })
        .catch((error: ICognitoError) => {
          if (error.code === 'UserNotFoundException') {
            this.signUp(phoneNumber, countryCode);
          } else if (error.code === 'UsernameExistsException') {
            this.signIn(phoneNumber, countryCode);
          } else {
            resolve();
          }
        });
    });
  };

  federatedIdentityLogin = (provider: CognitoHostedUIIdentityProvider) => {
    Auth.federatedSignIn({
      provider,
    });
  };

  verifyUserSession = (user: ICognitoUser, otp: string) => {
    Auth.sendCustomChallengeAnswer(user, otp).then((user: any) => {
      debugger;
    });
  };

  logOut = () => Auth.signOut();
}
