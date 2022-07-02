import { AWSError } from 'aws-sdk';
import { AWSLogins } from '../models';
import { AmplifyService } from './amplify.service';
import { AwsService } from './aws.service';
import { loginHook } from './login-hooks';

const { customLogin, socialLogin } = loginHook();

const amplifyService = new AmplifyService();

export const LoginService = {
  /**
   * Add User with social platforms Google, FaceBook, Instagram or Apple
   * @param idToken token to validate
   */
  addSocialUser: (idToken: AWSLogins) => {
    const credentials = AwsService.credentials(idToken);

    AwsService.authenticatedUser(credentials, (error?: AWSError) => {
      if (error) {
        console.error(error);
      } else {
      }
    });
  },
  addUnauthorizeCustomUser: (phoneNumber: number, countryCode = '+91') => {
    amplifyService.signIn(phoneNumber, countryCode);
    //amplifyService.googleLogin();

  },
};
