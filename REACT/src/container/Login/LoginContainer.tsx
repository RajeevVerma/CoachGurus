// Import modules
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';

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
            loginHook()
              .customLogin(
                {
                  email: 'anshui',
                  id: '2',
                  name: 'anshuld',
                  SignUpSourceType: UserSignUpSource.Unknown,
                  userType: UserType.Guru,
                },
                user?.signInUserSession?.accessToken.jwtToken
              )
              .then(() => {
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

      <OtpInput
        className='login-passcode'
        value={oneTimePasscode}
        onChange={(otp: string) => {
          setOneTimePasscode(otp);
        }}
        numInputs={4}
        inputStyle={{
          fontSize: '24px',
          width: '36px',
          height: '36px',
          margin: '4px',
          borderTop: '0px',
          borderLeft: '0px',
          borderRight: '0px',
          outline: 'none',
          borderColor: '#000a46',
        }}
        containerStyle={{
          margin: '20px auto',
          padding: '10px',
          display: 'inline-flex',
        }}
        isInputNum
      />

      <IonButton
        expand='block'
        className='login-custom-mail'
        onClick={() => handleVerifyLogin()}>
        <IonIcon slot='start' icon={mailOutline}></IonIcon>
        Verify OTP
      </IonButton>
    </div>
  );
};

export default LoginContainer;
