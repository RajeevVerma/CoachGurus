/** Import ionic components */
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenuToggle,
  IonItem,
} from '@ionic/react';

function MobileMenu(): JSX.Element {
  return (
    <IonMenu contentId='menu-content' menuId='menu-content' side='start'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonMenuToggle>
          <IonItem button routerLink={'/home'}>
            Home
          </IonItem>
          <IonItem button routerLink={'/sports'}>
            Sports
          </IonItem>
          <IonItem button routerLink={'/academics'}>
            Academics
          </IonItem>
          <IonItem button routerLink={'/extra-curricular'}>
            Extra Curricular
          </IonItem>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
}

export default MobileMenu;
