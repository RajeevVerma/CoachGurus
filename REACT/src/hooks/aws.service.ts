import AWS from 'aws-sdk';
import { AWSLogins } from '../models';

export const AwsService = {
  credentials: (idToken: AWSLogins): AWS.Credentials => {
    AWS.config.update({ region: 'us-east-1' });

    const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:00b158f6-feaf-4f00-b902-c55b01b15ad5',
      Logins: {
        ...idToken,
      },
    });

    AWS.config.credentials = credentials;

    return credentials;
  },

  authenticatedUser: (
    credentials: AWS.Credentials,
    authenticated: (err?: AWS.AWSError | undefined) => void
  ) => {
    credentials?.get(authenticated);
  },
};
