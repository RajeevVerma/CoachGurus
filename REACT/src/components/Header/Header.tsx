import { IonHeader, IonTitle, IonToolbar } from '@ionic/react';
import './Header.css';

interface ContainerProps { }

const Header: React.FC<ContainerProps> = () => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>Login</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
