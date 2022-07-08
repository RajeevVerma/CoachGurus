import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonRow,
  IonCol,
} from '@ionic/react';
import { menu } from 'ionicons/icons';
import { UserType } from '../../enums';
import { ICognitoUser } from '../../models';
import './Header.css';
import ProfileAvatar from './ProfileAvatar/ProfileAvatar';
/**
 * Represents Props for the Header component.
 */
export interface IHeaderProps {
  user?: ICognitoUser;
  logOutSession?: () => void;
  onLoginClickEvent?: (showModal: boolean, userType?: UserType) => void;
}

/**
 * Represents a Header component.
 * @param props
 */
function Header(props: IHeaderProps): JSX.Element {
  const { logOutSession, onLoginClickEvent, user } = props;
  return (
    <>
      {/* Mobile header */}
      <IonHeader className='mobile-header '>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton>
              <IonButton>
                <IonIcon slot='icon-only' icon={menu}></IonIcon>
              </IonButton>
            </IonMenuButton>
          </IonButtons>
          <IonTitle slot='start'>Coach Guru</IonTitle>
         
          <IonButtons slot='end'>
            <ProfileAvatar
              user={user}
              logOutSession={logOutSession}
              onLoginClickEvent={onLoginClickEvent}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Web Header */}
      <IonRow className='header ion-align-items-center'>
        <IonCol size='3' class='ion-align-items-center header-item'>
          Coach Guru
        </IonCol>

        <IonCol size='9' class='ion-text-right header-item'>
          <IonButton fill='clear' color='light' routerLink={'/home'}>
            Home
          </IonButton>
          <IonButton fill='clear' color='light' routerLink={'/sports'}>
            Sports
          </IonButton>
          <IonButton fill='clear' color='light' routerLink={'/academics'}>
            Academics
          </IonButton>
          <IonButton fill='clear' color='light' routerLink={'/extra-curricular'}>
            Extra Curricular
          </IonButton>
            <IonButton
                hidden={user !== undefined}
                fill='clear'
                color='light'
                onClick={() =>
                onLoginClickEvent && onLoginClickEvent(true, UserType.Guru)
                }>
                Join as Coach
            </IonButton>
            <IonButton>
            <ProfileAvatar
                user={user}
                logOutSession={logOutSession}
                onLoginClickEvent={onLoginClickEvent}
            />
            </IonButton>
        </IonCol>
        {/* <IonCol size='3' className='ion-text-right header-item'>
        </IonCol> */}
      </IonRow>
    </>
  );
}

export default Header;
