import React from 'react';
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
    IonMenu,
    IonContent,
    IonMenuToggle,
    IonItem,
    IonPage
} from '@ionic/react';
import { menu, personCircleOutline } from 'ionicons/icons';
import './Header.css';
/**
 * Represents Props for the Header component. 
 */
export interface IHeaderProps {
};

/**
 * Represents a Header component.
 * @param props
 */
function Header(props: IHeaderProps): JSX.Element {
    return (
        <>
            {/* Mobile header */}
            <IonHeader className='mobile-header '>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton className='mobile-menu' menu='main-content'>
                            <IonButton >
                                <IonIcon slot='icon-only' icon={menu}></IonIcon>
                            </IonButton>
                        </IonMenuButton>
                    </IonButtons>
                    <IonTitle slot='start'>Coach Guru</IonTitle>

                    <IonButtons slot='end'>
                        <IonButton slot='end'>
                            <IonIcon slot='icon-only' icon={personCircleOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonMenu contentId='main-content' menuId='main-content' side='start'>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonMenuToggle>
                        <IonItem button >
                            Home
                        </IonItem>
                        <IonItem button >
                            Sport
                        </IonItem>
                        <IonItem button >
                            Academics
                        </IonItem>
                        <IonItem button >
                            Extra Curicullar
                        </IonItem>
                    </IonMenuToggle>
                </IonContent>
            </IonMenu>

            {/* Web Header */}
            <IonRow className='header ion-align-items-center'>
                <IonCol size='3' class='ion-align-items-center header-item'>
                    Coach Guru
                </IonCol>

                <IonCol size='6' class='ion-text-left header-item'>
                    <IonButton fill='clear' color='dark'>
                        Home
                    </IonButton>
                    <IonButton fill='clear' color='dark'>
                        Sports
                    </IonButton>
                    <IonButton fill='clear' color='dark'>
                        Academics
                    </IonButton>
                    <IonButton fill='clear' color='dark'>
                        Extra Curicullar
                    </IonButton>
                </IonCol>
                <IonCol size='3' className='ion-text-right header-item'>
                    <IonButton fill='clear' color='dark'>
                        Join as Coach
                    </IonButton>
                    <IonButton fill='clear' color='dark'>
                        <IonIcon icon={personCircleOutline} />
                    </IonButton>
                </IonCol>
            </IonRow>
        </>
    );
}

export default Header;