// Import components
import { IonButton, IonCol, IonGrid, IonHeader, IonIcon, IonRow } from '@ionic/react';

// Import AWS Configuration
import AWS from 'aws-sdk';
import { User } from "@codetrix-studio/capacitor-google-auth";
import '@codetrix-studio/capacitor-google-auth';


// Import Utilities
import { GoogleInit, GoogleLogin, PlatFromUtility } from '../../utilities'

// Import Icons
import { logoGoogle, logoApple, logoFacebook, mailOutline } from "ionicons/icons";

// Import css
import './LoginContainer.css';

import { AWSLogins } from '../../models';

interface ContainerProps { }

//GoogleInit();

const LoginContainer: React.FC<ContainerProps> = () => {

    const loginWithGoogle = () => {
        GoogleLogin()
            .then((user: User) => {
                AWSLogins['accounts.google.com'] = user.authentication.idToken;
                AuthenticateAWS({ idToken: AWSLogins });
            });
    }

    const AuthenticateAWS = ({ idToken }: { idToken: typeof AWSLogins; }) => {

        AWS.config.update({ region: 'us-east-1' });

        const credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'us-east-1:00b158f6-feaf-4f00-b902-c55b01b15ad5',
            Logins: idToken
        });

        AWS.config.credentials = credentials;

        credentials.get((error) => {
            // Access AWS resources here.
            if (!error) {
                // TODO: Create USER
            }
        });
    }

    // const FBLogin: FacebookLoginPlugin = FacebookLogin;

    // FBLogin.initialize({
    //     appId: '738509124269341',
    //     xfbml: true, // parse social plugins on this page
    //     version: 'v5.0', // use graph api current version  
    //     autoLogAppEvents: true,
    // }).then((value) => {
    //     FBLogin.login({
    //         permissions: ['public_profile', 'email']
    //     }).then((response) => {

    //         AWS.config.update({ region: 'us-east-1' });

    //         const credentials = new AWS.CognitoIdentityCredentials({
    //             IdentityPoolId: 'us-east-1:00b158f6-feaf-4f00-b902-c55b01b15ad5',
    //             Logins: {
    //                 'graph.facebook.com': response.accessToken?.token ?? '',
    //             }
    //         });

    //         AWS.config.credentials = credentials;

    //         credentials.get(async (error) => {
    //             // Access AWS resources here.
    //             console.log('We are in', error);
    //             if (!error) {

    //                 const profile = await FacebookLogin.getProfile<{
    //                     email: string;
    //                     public_profile: string;
    //                 }>({ fields: ['email'] });

    //                 try {

    //                     axios.get('/api/users/all').then((res) => {
    //                         debugger;
    //                     })

    //                     axios.post(`/api/users/add`, {
    //                         "id": response.accessToken?.token,
    //                         "name": response.accessToken?.userId,
    //                         "email": profile.email
    //                     }, {
    //                         proxy: {
    //                             host: "localhost",
    //                             port: 3000,

    //                         },
    //                     }).then(response => {
    //                         let byteArray = response;
    //                         let data = byteArray;
    //                         console.log(data);
    //                     }
    //                     );
    //                 } catch (e) {
    //                     console.error(
    //                         'Error: An error was detected in the function "fetch" /api/cases/create_search_case OR in msgpk:',
    //                         e
    //                     );
    //                 }
    //             }
    //         });
    //     })
    // });



    // const FacebookLogin = new FacebookLoginWeb().login({
    //     permissions: ['public_profile', 'email'],
    // }).then((value)=>{
    //     debugger

    // })



    // GoogleAuth.signIn().
    //     then((response: User) => {
    //         debugger;

    //         AWS.config.update({ region: 'us-east-1' });

    //         const credentials = new AWS.CognitoIdentityCredentials({
    //             IdentityPoolId: 'us-east-1:00b158f6-feaf-4f00-b902-c55b01b15ad5',
    //             Logins: {
    //                 'accounts.google.com': response.authentication.idToken
    //             }
    //         });

    //         AWS.config.credentials = credentials;

    //         credentials.get((error) => {
    //             debugger;
    //             // Access AWS resources here.
    //             console.log('We are in', error);
    //             if (!error) {
    //                 // const user = this.makeUser(username);
    //                 //  console.log(user);
    //             }
    //         });
    //     });

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
                        <IonButton expand="block" className='login-facebook'>
                            <IonIcon slot="start" icon={logoFacebook}></IonIcon>
                            Signin with Facebook
                        </IonButton>
                        <IonButton expand="block" className='login-custom-mail'>
                            <IonIcon slot="start" icon={mailOutline}></IonIcon>
                            Signin with Facebook
                        </IonButton>
                    </div>
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default LoginContainer;
