// Import components
import {
  IonButton,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
} from '@ionic/react';

// Import AWS Configuration
import AWS from 'aws-sdk';
import { Auth } from '@aws-amplify/auth';
import awsconfig from '../../aws-exports';

import { Amplify } from 'aws-amplify';

import { GoogleAuth, User } from '@codetrix-studio/capacitor-google-auth';
import {
  FacebookLogin,
  FacebookLoginPlugin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login';

// Import Utilities
import { GoogleLogin, PlatFromUtility } from '../../utilities';

// Import Icons
import {
  logoGoogle,
  logoApple,
  logoFacebook,
  mailOutline,
} from 'ionicons/icons';

// Import Hooks
import { loginHook } from '../../hooks';

// Import css
import './LoginContainer.css';

import { AWSLogins, IUser } from '../../models';
import { UserSignUpSource, UserType } from '../../enums';
import { useEffect, useState } from 'react';

interface ContainerProps {}

GoogleAuth.initialize();
Amplify.configure(awsconfig);

const NOTSIGNIN = 'You are NOT logged in';
const SIGNEDIN = 'You have logged in successfully';
const SIGNEDOUT = 'You have logged out successfully';
const WAITINGFOROTP = 'Enter OTP number';
const VERIFYNUMBER = 'Verifying number (Country code +XX needed)';

const LoginContainer: React.FC<ContainerProps> = () => {
  const [message, setMessage] = useState('Welcome to Demo');
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [otp, setOtp] = useState('');
  const [number, setNumber] = useState('+918380088317');
  const password = Math.random().toString(10) + 'Abc#';

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
        setMessage(SIGNEDIN);
        setSession(null);
      })
      .catch((err) => {
        console.error(err);
        setMessage(NOTSIGNIN);
      });
  };
  const signOut = () => {
    if (user) {
      Auth.signOut();
      setUser(null);
      setOtp('');
      setMessage(SIGNEDOUT);
    } else {
      setMessage(NOTSIGNIN);
    }
  };
  const signIn = () => {
    setMessage(VERIFYNUMBER);
    Auth.signIn(number)
      .then((result) => {
        setSession(result);
        setMessage(WAITINGFOROTP);
      })
      .catch((e) => {
        if (e.code === 'UserNotFoundException') {
          signUp();
        } else if (e.code === 'UsernameExistsException') {
          setMessage(WAITINGFOROTP);
          signIn();
        } else {
          console.log(e.code);
          console.error(e);
        }
      });
  };
  const signUp = async () => {
    const result = await Auth.signUp({
      username: number,
      password,
      attributes: {
        phone_number: number,
      },
    }).then(() => signIn());
    return result;
  };
  const verifyOtp = () => {
    Auth.sendCustomChallengeAnswer(session, otp)
      .then((user: any) => {
        setUser(user);
        setMessage(SIGNEDIN);
        setSession(null);
      })
      .catch((err: Error) => {
        setMessage(err.message);
        setOtp('');
        console.log(err);
      });
  };

  const { login } = loginHook();

  let loggedInUser: IUser;

  const loginWithGoogle = () => {
    GoogleLogin().then((user: User) => {
      loggedInUser = {
        email: user.email,
        id: user.id,
        name: user.name,
        SignUpSourceType: UserSignUpSource.Google,
        userType: UserType.Trainee,
      };

      AuthenticateAWS({
        'accounts.google.com': user.authentication.idToken,
      });
    });
  };

  const loginWithFaceBook = async () => {
    await FacebookLogin.initialize({ appId: '738509124269341' });

    const FBLogin: FacebookLoginPlugin = FacebookLogin;

    FBLogin.login({
      permissions: ['public_profile', 'email'],
    }).then((response: FacebookLoginResponse) => {
      AuthenticateAWS({
        'graph.facebook.com': response.accessToken?.token ?? '',
      });
    });
  };

  const AuthenticateAWS = (idToken: AWSLogins) => {
    AWS.config.update({ region: 'us-east-1' });

    const credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:00b158f6-feaf-4f00-b902-c55b01b15ad5',
      Logins: {
        ...idToken,
      },
    });

    AWS.config.credentials = credentials;

    credentials.get(async (error) => {
      // Access AWS resources here.
      if (!error && loggedInUser) {
        await login(loggedInUser);
      }
    });
  };

  return (
    <IonGrid className='login-grid'>
      <IonRow className='login-grid-row'>
        <IonCol
          hidden={PlatFromUtility.isMobile()}
          className='login-left-panel'>
          {/* TODO: Web Content  */}
        </IonCol>
        <IonCol className='login-right-panel'>
          <IonHeader className='login-right-panel-h1'>
            Join over 25 million people who use Sworkit for custom workouts
            anytime anywhere.
          </IonHeader>
          <div className='login-action'>
            <IonButton expand='block' className='login-apple'>
              <IonIcon slot='start' icon={logoApple}></IonIcon>
              Signin with Apple
            </IonButton>
            <IonButton
              expand='block'
              className='login-google'
              onClick={() => loginWithGoogle()}>
              <IonIcon slot='start' icon={logoGoogle}></IonIcon>
              Signin with Google
            </IonButton>
            <IonButton
              expand='block'
              className='login-facebook'
              onClick={() => signIn()}>
              <IonIcon slot='start' icon={logoFacebook}></IonIcon>
              Signin with Facebook
            </IonButton>
            <IonButton
              expand='block'
              className='login-custom-mail'
              onClick={() => signOut()}>
              <IonIcon slot='start' icon={mailOutline}></IonIcon>
              Signin with Custom
            </IonButton>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LoginContainer;
