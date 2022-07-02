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

import { AWSLogins, ISocialUser } from '../../models';
import { UserSignUpSource, UserType } from '../../enums';
import { useEffect, useState } from 'react';
import { LoginService } from '../../hooks/login.service';

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

  const { addUnauthorizeCustomUser, addSocialUser } = LoginService;

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = () => {
    Auth.currentAuthenticatedUser()
      .then((user: any) => {
        setUser(user);
        setMessage(SIGNEDIN);
        setSession(null);
      })
      .catch((err: any) => {
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

  let loggedInUser: ISocialUser;

  const loginWithGoogle = () => {
    GoogleLogin().then((user: User) => {
      loggedInUser = {
        email: user.email,
        id: user.id,
        name: user.name,
        SignUpSourceType: UserSignUpSource.Google,
        userType: UserType.Trainee,
      };

      addSocialUser({
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
      addSocialUser({
        'graph.facebook.com': response.accessToken?.token ?? '',
      });
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
              onClick={() => addUnauthorizeCustomUser(7387799822)}>
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
