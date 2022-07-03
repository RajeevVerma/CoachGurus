// Import modules
import { useEffect, useState } from 'react';

// Import components
import {
  IonButton,
  IonCol,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonRow,
} from '@ionic/react';

// Import Utilities
import { PlatFromUtility } from '../../utilities';

// Import Icons
import {
  logoGoogle,
  logoApple,
  logoFacebook,
  mailOutline,
} from 'ionicons/icons';

// Import css
import './LoginContainer.css';

import { LoginService } from '../../hooks/login.service';
import { ICognitoUser } from '../../models';
import { useHistory } from 'react-router';

interface ContainerProps {}
const LoginContainer: React.FC<ContainerProps> = () => {
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<ICognitoUser | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string>('7387799822');
  const [oneTimePasscode, setOneTimePasscode] = useState('');

  const {
    addUnauthorizeCustomUser,
    authenticateWithApple,
    authenticateWithFaceBook,
    authenticateWithGoogle,
    verifyLogin,
    logOut,
  } = LoginService;

  const handleLogout = () => logOut();

  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  const handleLoginEvent = () => {
    addUnauthorizeCustomUser(phoneNumber).then((user?: ICognitoUser) => {
      setUser(user);
    });
  };

  let history = useHistory();

  const handleVerifyLogin = async () => {
    if (user) {
      await verifyLogin(user, oneTimePasscode)
        .then(() => {
          history.push('/home');
        })
        .catch(() => {
          setMessage('Invalid otp');
        });
    }
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
          <IonHeader className='login-right-panel-h1'>{message}</IonHeader>
          <div className='login-action'>
            <IonButton
              expand='block'
              className='login-apple'
              onClick={() => authenticateWithApple()}>
              <IonIcon slot='start' icon={logoApple}></IonIcon>
              Signin with Apple
            </IonButton>
            <IonButton
              expand='block'
              className='login-google'
              onClick={() => authenticateWithGoogle()}>
              <IonIcon slot='start' icon={logoGoogle}></IonIcon>
              Signin with Google
            </IonButton>
            <IonButton
              expand='block'
              className='login-facebook'
              onClick={() => authenticateWithFaceBook()}>
              <IonIcon slot='start' icon={logoFacebook}></IonIcon>
              Signin with Facebook
            </IonButton>
            <IonInput
              type='text'
              className='custom-login'
              pattern='\d{3}[\-]\d{3}[\-]\d{4}'
              value={phoneNumber}
              onIonChange={(event) => setPhoneNumber(`${event.target.value}`)}
            />

            <IonButton
              expand='block'
              className='login-custom-mail'
              onClick={() => handleLoginEvent()}>
              <IonIcon slot='start' icon={mailOutline}></IonIcon>
              GET OTP
            </IonButton>

            <IonInput
              type='text'
              className='custom-login-otp'
              value={oneTimePasscode}
              onIonChange={(event) =>
                setOneTimePasscode(`${event.target.value}`)
              }
            />

            <IonButton
              expand='block'
              className='login-custom-mail'
              onClick={() => handleVerifyLogin()}>
              <IonIcon slot='start' icon={mailOutline}></IonIcon>
              Verify OTP
            </IonButton>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LoginContainer;
