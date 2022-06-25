// Import components
import { IonButton, IonCol, IonGrid, IonHeader, IonIcon, IonRow } from '@ionic/react';

// Import AWS Configuration
import AWS from 'aws-sdk';
import { GoogleAuth, User } from "@codetrix-studio/capacitor-google-auth";
import { FacebookLogin, FacebookLoginPlugin, FacebookLoginResponse } from '@capacitor-community/facebook-login';

// Import Utilities
import { GoogleLogin, PlatFromUtility } from '../../utilities'

// Import Icons
import { logoGoogle, logoApple, logoFacebook, mailOutline } from "ionicons/icons";

// Import css
import './LoginContainer.css';

import { AWSLogins } from '../../models';

interface ContainerProps {
}

GoogleAuth.initialize();

const LoginContainer: React.FC<ContainerProps> = () => {

    const loginWithGoogle = () => {

        GoogleLogin()
            .then((user: User) => {
                AuthenticateAWS({
                    'accounts.google.com': user.authentication.idToken
                });
            });
    }

    const loginWithFaceBook = async () => {

        await FacebookLogin.initialize({ appId: '738509124269341' });

        const FBLogin: FacebookLoginPlugin = FacebookLogin;

        FBLogin.login({
            permissions: ['public_profile', 'email']
        }).then((response: FacebookLoginResponse) => {
            AuthenticateAWS({
                'graph.facebook.com': response.accessToken?.token ?? ''
            });
        });
    }

    const AuthenticateAWS = (idToken: AWSLogins) => {

        AWS.config.update({ region: 'us-east-1' });

        const logins: any = { idToken };

        const credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:00b158f6-feaf-4f00-b902-c55b01b15ad5',
            Logins: logins
        });

        AWS.config.credentials = credentials;

        credentials.get((error) => {
            // Access AWS resources here.
            if (!error) {
                // TODO: Create USER
            }
        });
    }

    return (
        <IonGrid className='login-grid'>
            <IonRow className='login-grid-row'>
                <IonCol hidden={PlatFromUtility.isMobile()} className='login-left-panel'>
                    {/* TODO: Web Content  */}
                </IonCol>
                <IonCol className='login-right-panel'>
                    <IonHeader className='login-right-panel-h1'>
                        Join over 25 million people who use Sworkit for custom workouts anytime anywhere.
                    </IonHeader>
                    <div className='login-action'>
                        <IonButton expand="block" className='login-apple'>
                            <IonIcon slot="start" icon={logoApple}></IonIcon>
                            Signin with Apple
                        </IonButton>
                        <IonButton
                            expand="block"
                            className='login-google'
                            onClick={() => loginWithGoogle()}>
                            <IonIcon slot="start" icon={logoGoogle}></IonIcon>
                            Signin with Google
                        </IonButton>
                        <IonButton
                            expand="block"
                            className='login-facebook'
                            onClick={() => loginWithFaceBook()}>
                            <IonIcon slot="start" icon={logoFacebook}></IonIcon>
                            Signin with Facebook
                        </IonButton>
                        <IonButton expand="block" className='login-custom-mail'>
                            <IonIcon slot="start" icon={mailOutline}></IonIcon>
                            Signin with Custom
                        </IonButton>
                    </div>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default LoginContainer;
