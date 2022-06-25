// Import Ionic 
import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonButton,
    IonIcon
} from '@ionic/react';
import { star } from 'ionicons/icons';
// Import style 
import './GuruCard.css';

/**
 * Represents props for the GuruCard Component.
 */
interface IGuruCardProps {

}

/** Represent Guru Card Component.
 * props: IGuruCardProps
 */
function GuruCard(props: IGuruCardProps): JSX.Element {
    return (
        <IonCard>
            <img alt={'guru-card'} src="assets/images/madison.jpeg" />
            <IonCardHeader>
                <IonCardSubtitle>Kharadi, Pune</IonCardSubtitle>
                <IonCardTitle>Tony Stark <span className='rating-container'><IonIcon icon={star} /> 3.5</span> </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonText color='gray'>
                    <h3>Badminton</h3>

                </IonText>
                <IonText color='primary'>
                    <h4>15 Years of experience, </h4>
                </IonText>
                <IonButton>Details</IonButton>
            </IonCardContent>
        </IonCard>
    );
}

export default GuruCard;