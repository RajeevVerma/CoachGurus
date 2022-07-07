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

interface IUserProfileEditPageProps {
  user?: ICognitoUser;
  userType: UserType;
}

function UserProfileEditPage(props: IUserProfileEditPageProps): JSX.Element {
  return (
    <IonPage>
      <IonContent fullscreen={true}>
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
      </IonContent>
    </IonPage>
  );
}

export default UserProfileEditPage;
