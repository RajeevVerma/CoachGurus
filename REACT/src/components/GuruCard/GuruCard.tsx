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
import Button from '@mui/material/Button';
import { star } from 'ionicons/icons';
// Import style 
import './GuruCard.scss';

interface ISportGuru {
    name: string,
    imageUrl: string,
    category: string,
    experience: number,
    location: string,
    rating: number,
}

/**
 * Represents props for the GuruCard Component.
 */
interface IGuruCardProps {
    guru: ISportGuru,
}

/** Represent Guru Card Component.
 * props: IGuruCardProps
 */
function GuruCard(props: IGuruCardProps): JSX.Element {
    const guru = props.guru;

    return (
        <IonCard>
            <img alt={'guru-card'} src={guru.imageUrl} />
            <IonCardHeader>
                <IonCardSubtitle>{guru.location}</IonCardSubtitle>
                <IonCardTitle className='flex-item'>{guru.name} <span><IonIcon icon={star} /> {guru.rating}</span> </IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="flex-item">
                <div>
                    <IonText>
                        <h3>{guru.category}</h3>
                    </IonText>
                    <IonText color='primary'>
                        <h4>{guru.experience} Years of experience, </h4>
                    </IonText>
                </div>
                <Button href="/coach" className="coachDetailsButton" variant="contained">Details</Button>
            </IonCardContent>
        </IonCard>
    );
}

export default GuruCard;