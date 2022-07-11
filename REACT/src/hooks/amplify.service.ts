import { Auth } from '@aws-amplify/auth';
import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types/Auth';
import { v4 } from 'uuid';
import { ICognitoError, ICognitoUser, IUserAttributes } from '../models';

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
  ): Promise<ICognitoUser | undefined> =>
    new Promise(async (resolve: (user?: ICognitoUser) => void) => {
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

  /**
   * Not in use
   * @param provider
   */
  federatedIdentityLogin = (provider: CognitoHostedUIIdentityProvider) => {
    Auth.federatedSignIn({ provider });
  };

  verifyUserSession = (user: ICognitoUser, otp: string) =>
    new Promise(async (resolve: (user?: ICognitoUser) => void) => {
      Auth.sendCustomChallengeAnswer(user, otp).then((user: ICognitoUser) => {
        resolve(user);
      });
    });

  getLoggedInUser = async (): Promise<ICognitoUser> =>
    await Auth.currentAuthenticatedUser();

  updateAttributes = async (user: ICognitoUser, attributes: IUserAttributes) =>
    await Auth.updateUserAttributes(user, attributes);

  logOut = () => Auth.signOut();
}
