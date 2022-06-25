import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonSearchbar,
} from '@ionic/react';

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

import { Header, Footer, GuruCard, HomeBanner } from '../../components';

import './Home.css';

const Home: React.FC = () => {
    return (
        <>
            <Header />
            <IonContent
                fullscreen={true}>

                {/** Banner  */}
                <HomeBanner />
                <div className="header-container">
                    <h3>Featured Gurus</h3>
                </div>
                <IonGrid>
                    <IonRow>
                        <IonCol size="4" sizeMd='4' sizeXs='12'>
                            <GuruCard />
                        </IonCol>
                        <IonCol size="4" sizeMd='4' sizeXs='12'>
                            <GuruCard />
                        </IonCol>
                        <IonCol size="4" sizeMd='4' sizeXs='12'>
                            <GuruCard />
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <Footer />

            </IonContent>

        </>
    );
};

export default Home;
