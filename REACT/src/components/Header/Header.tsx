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
  IonLabel,
  IonItem,
} from '@ionic/react';
import { menu, personCircleOutline } from 'ionicons/icons';
import { Redirect, useHistory, useLocation } from 'react-router';
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

  const history = useHistory();

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
              user={props.user}
              logOutSession={props.logOutSession}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Web Header */}
      <IonRow className='header ion-align-items-center'>
        <IonCol size='3' class='ion-align-items-center header-item'>
          Coach Guru
        </IonCol>

        <IonCol size='6' class='ion-text-left header-item'>
          <IonButton fill='clear' color='dark' routerLink={'/home'}>
            Home
          </IonButton>
          <IonButton fill='clear' color='dark' routerLink={'/sports'}>
            Sports
          </IonButton>
          <IonButton fill='clear' color='dark' routerLink={'/academics'}>
            Academics
          </IonButton>
          <IonButton fill='clear' color='dark' routerLink={'/extra-curricular'}>
            Extra Curricular
          </IonButton>
        </IonCol>
        <IonCol size='3' className='ion-text-right header-item'>
          <IonButton
            fill='clear'
            color='dark'
            onClick={() =>
              onLoginClickEvent && onLoginClickEvent(true, UserType.Guru)
            }>
            Join as Coach
          </IonButton>
          <ProfileAvatar
            user={user}
            logOutSession={logOutSession}
            onLoginClickEvent={onLoginClickEvent}
          />
        </IonCol>
      </IonRow>
    </>
  );
}

export default Header;
