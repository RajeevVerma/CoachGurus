// Import components
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonRow } from '@ionic/react';
import { isPlatform } from '@ionic/react';

// Import Icons
import { logoGoogle, logoApple, logoFacebook, mailOutline } from "ionicons/icons";

// Import css
import './LoginContainer.css';

interface ContainerProps { }

const LoginContainer: React.FC<ContainerProps> = () => {

    const isMobile = isPlatform('android')
        || isPlatform('mobile')
        || isPlatform('mobileweb')
        || isPlatform('iphone')
        || isPlatform('cordova')
        || isPlatform('capacitor');

    return (
        <IonGrid className='login-grid'>
            <IonRow className='login-grid-row'>
                <IonCol hidden={isMobile} className='login-left-panel'>
                    {/* TODO: Web Content  */}
                </IonCol>
                <IonCol className='login-right-panel'>
                    <IonHeader>
                        Join over 25 million people who use Sworkit for custom workouts anytime anywhere.
                    </IonHeader>
                    <IonButton expand="block" className='login-apple'>
                        <IonIcon slot="start" icon={logoApple}></IonIcon>
                        Signin with Apple
                    </IonButton>
                    <IonButton expand="block" className='login-google'>
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
                </IonCol>
            </IonRow>
        </IonGrid>
    );
};

export default LoginContainer;
