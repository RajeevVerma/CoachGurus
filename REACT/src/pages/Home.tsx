import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemOption,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonPage,
    IonRow,
    IonSearchbar,
    IonSelect,
    IonSelectOption,
    IonSplitPane,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { home, menu, star } from 'ionicons/icons'
import ExploreContainer from '../components/ExploreContainer';
import Footer from '../components/Footer/Footer';
import GuruCard from '../components/GuruCard/GuruCard';
import Header from '../components/Header/Header';
import HomeBanner from '../components/HomeBanner/HomeBanner';
import './Home.css';

const Home: React.FC = () => {
    return (
        <>
            <IonContent
                fullscreen={true}>
                {/* Component 2 --  The searchbox   */}
                <div
                    id='main-div'
                    className='home-main-container'>
                    <div className='search-box-container'>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Location</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={'Pune'}
                                            label="Location"
                                        /**onChange = {} */
                                        >
                                            <MenuItem value='MyLocation'>Use My Location</MenuItem>
                                            <MenuItem value='Pune'>Pune</MenuItem>
                                        </Select>
                                    </FormControl>
                                </IonCol>
                                <IonCol>
                                    <IonSearchbar value='' onIonChange={e => console.log(e.detail.value!)} animated placeholder='Search Gurus'></IonSearchbar>
                                </IonCol>
                                <IonCol >
                                    <IonButton>
                                        Find Gurus
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </div>

                </div>
                {/* Component 3 - Guru Card  */}
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
                {/*<IonFooter collapse="fade">
                    <IonToolbar>
                        <IonTitle>&copy; Coach Guru</IonTitle>
                        <h1>Hola</h1>
                    </IonToolbar>
    </IonFooter>*/}
            </IonContent>

        </>
    );
};

export default Home;
