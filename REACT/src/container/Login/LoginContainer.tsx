// Import components
import { IonCol, IonIcon, IonRow } from '@ionic/react';
import { personCircle } from "ionicons/icons";

// Import css
import './LoginContainer.css';

interface ContainerProps { }

const LoginContainer: React.FC<ContainerProps> = () => {
    return (
        <>
            <IonRow>
                <IonCol>
                    <IonIcon
                        style={{ fontSize: "70px", color: "#0040ff" }}
                        icon={personCircle}
                    />
                </IonCol>
            </IonRow>
        </>
    );
};

export default LoginContainer;
