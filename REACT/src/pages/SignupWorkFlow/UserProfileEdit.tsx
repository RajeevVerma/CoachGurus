import {
  IonChip,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from '@ionic/react';
import { UserType } from 'enums';
import { ICognitoUser } from 'models';

import './UserProfileEdit.css';

interface IUserProfileEditPageProps {
  user?: ICognitoUser;
  userType: UserType;
}

function UserProfileEditPage(props: IUserProfileEditPageProps): JSX.Element {
  return (
    <IonPage className='user-profile'>
      <IonContent fullscreen={false}>
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
        <IonItem>
          <IonChip>
            <IonLabel>Sports</IonLabel>
          </IonChip>
          <IonChip>
            <IonLabel>Academics</IonLabel>
          </IonChip>
          <IonChip>
            <IonLabel>Extra Curricular</IonLabel>
          </IonChip>
        </IonItem>
      </IonContent>
    </IonPage>
  );
}

export default UserProfileEditPage;
