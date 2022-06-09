import { IonContent, IonPage } from '@ionic/react';

import { Header } from '../components';
import { LoginContainer } from '../container';

import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen>
        <LoginContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
