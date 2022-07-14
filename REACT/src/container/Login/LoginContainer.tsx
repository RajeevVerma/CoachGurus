// Import modules
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import OtpInput from 'react-otp-input';

// Import components
import { IonButton, IonIcon, IonInput, NavContext } from '@ionic/react';

// Import Icons
import { mailOutline } from 'ionicons/icons';

// Import css
import './LoginContainer.css';

import { ICognitoUser } from '../../models';
import { ServerHooks, LoginService } from '../../hooks';
import { UserSignUpSource, UserType } from '../../enums';
import randomNumberTimeBased from 'models/shared/randomGenerator.utility';

interface IContainerProps {
    userType: UserType;
}
const LoginContainer: React.FC<IContainerProps> = (props: IContainerProps) => {
    const { userType } = props;

    const { navigate } = useContext(NavContext);
    const [message, setMessage] = useState<string>('');
    const [user, setUser] = useState<ICognitoUser | undefined>();
    const [phoneNumber, setPhoneNumber] = useState<string>('7387799822');
    const [oneTimePasscode, setOneTimePasscode] = useState('');

    const { addUnauthorizeCustomUser, verifyLogin } = LoginService();
    const { updateUser } = ServerHooks();

    const handleLoginEvent = () => {
        addUnauthorizeCustomUser(phoneNumber).then((user?: ICognitoUser) => {
            setUser(user);
        });
    };

    const history = useHistory();

    const insertUser = () => {
        updateUser({
            mobilePhone: phoneNumber,
            coachingEndeavourPks: '',
            signUpSourceType: UserSignUpSource.Phone,
            userType: userType,
            phoneOtpVerified: true,
            bucketFolderName: randomNumberTimeBased(phoneNumber)
        })
            .then(() => {
                navigate('/profile-edit');
            })
            .catch(() => {
                setMessage('Failed to Verify User try Again.');
            });
    };

    const handleVerifyLogin = async () => {
        if (user) {
            await verifyLogin(user, oneTimePasscode)
                .then((authenticatedUser?: ICognitoUser) => {
                    if (authenticatedUser?.signInUserSession?.accessToken) {
                        insertUser();
                    } else {
                        setMessage('Failed to Verify User try Again.');
                    }
                })
                .catch(() => setMessage('Invalid otp'));
        }
    };

    return (
        <div className='login-action'>
            {UserType[userType]}

            {message}

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
