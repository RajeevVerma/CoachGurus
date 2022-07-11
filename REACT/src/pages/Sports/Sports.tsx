import { IonContent, IonPage } from '@ionic/react';
import { CoachAdminScreen } from '../../container/'

function SportsPage(): JSX.Element {
  return (
    <IonPage>
      <IonContent>
        <h1>Sports</h1>
        <CoachAdminScreen />
      </IonContent>
    </IonPage>
  );
}

export default SportsPage;
