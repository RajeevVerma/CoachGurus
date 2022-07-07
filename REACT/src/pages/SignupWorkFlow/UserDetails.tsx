import { IonChip, IonInput, IonItem, IonLabel, IonPage } from '@ionic/react';

function UserDetails(): JSX.Element {
  return (
    <IonPage>
      <IonItem>
        <IonLabel>Name</IonLabel>
        <IonInput type='text' id='user-name' />
      </IonItem>

      <IonItem>
        <IonLabel>Phone Number (WhatsApp)</IonLabel>
        <IonInput type='tel' id='user-tel' />
      </IonItem>

      <IonItem>
        <IonLabel>Email</IonLabel>
        <IonInput type='email' id='user-email' />
      </IonItem>

      <IonItem>
        <IonLabel>User Type</IonLabel>
        <IonInput type='text' id='user-type' />
      </IonItem>

      <IonChip>
        <IonLabel>Default</IonLabel>
      </IonChip>
    </IonPage>
  );
}

export default UserDetails;
