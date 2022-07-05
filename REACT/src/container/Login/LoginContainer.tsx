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
import { mailOutline } from 'ionicons/icons';

// Import css
import './LoginContainer.css';

import { LoginService } from '../../hooks/login.service';
import { ICognitoUser } from '../../models';
import { useHistory } from 'react-router';
import { loginHook } from '../../hooks';
import { UserSignUpSource, UserType } from '../../enums';

interface ContainerProps {}
const LoginContainer: React.FC<ContainerProps> = () => {
  const [message, setMessage] = useState<string>('');
  const [user, setUser] = useState<ICognitoUser | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string>('7387799822');
  const [oneTimePasscode, setOneTimePasscode] = useState('');

  const { addUnauthorizeCustomUser, verifyLogin, logOut } = LoginService();

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
        .then((user) => {

          debugger;
          if (user?.signInUserSession?.accessToken) {
            loginHook().customLogin(
              {
                email: 'anshui',
                id: '2',
                name: 'anshuld',
                SignUpSourceType: UserSignUpSource.Unknown,
                userType: UserType.Guru,
              },
              user?.signInUserSession?.accessToken.jwtToken
            ).then(()=> {
              history.push('/home');
            });
          }
         
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
