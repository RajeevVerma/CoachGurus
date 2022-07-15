/** Import ionic-react components */
import {
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonIcon,
} from '@ionic/react';

/** Import material-react components */
import { 
    IconButton, 
    InputBase, 
    Paper, 
    Typography 
} from '@mui/material';
import { Container } from '@mui/system';
import { search } from 'ionicons/icons';

/** Import Components */
import { 
    BlogContent, 
    Footer, 
    GuruCard, 
    HomeBanner, 
    Testimonials
} from '../../components';
import LocationPicker from '../../components/Header/LocationPicker/LocationPicker';

/** Import Styles */
import styles from './Home.module.scss';

const guruList = [
    {
        name: 'NITHIN SHARMA',
        imageUrl: `${process.env.PUBLIC_URL}/assets/images/guru_badminton.jpg`,
        category: 'Badminton',
        experience: 8,
        location: 'Lavale, Pune',
        rating: 4.5,
    },
    {
        name: 'RAJ KUMAR',
        imageUrl: `${process.env.PUBLIC_URL}/assets/images/guru_basket.jpg`,
        category: 'Basketball',
        experience: 6,
        location: 'KharadiP, Pune',
        rating: 5,
    },
    {
        name: 'ANAND VIHARI',
        imageUrl: `${process.env.PUBLIC_URL}/assets/images/guru_chess.jpg`,
        category: 'Chess',
        experience: 9,
        location: 'Yerawada, Pune',
        rating: 4.5

    },
];

const Home: React.FC = () => {
    return (
        <>
            <IonContent>
                <header>
                    {/* <Header /> */}
                    <div className={styles.mainHeader}>
                        <div className={styles.bannerContent}>
                            <Typography className={styles.bannerTitle} variant="h2">Find <br />The Best Gurus</Typography>
                            <IonRow className={styles.searchContainer}>
                            <IonCol className={styles.searchLocaitonContainer} size='2' sizeMd='2' sizeSm='6' sizeXs='12'>
                                <LocationPicker />
                            </IonCol>

                            <IonCol className={styles.searchGuru} size='4' sizeMd='4' sizeSm='6' sizeXs='12'>
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>

                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Search Gurus"
                                        inputProps={{ 'aria-label': 'search gurus' }}
                                    />
                                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                                        <IonIcon icon={search} />
                                    </IconButton>
                                </Paper>
                            </IonCol>
                        </IonRow>
                        </div>
                    </div>
                </header>

                {/** Banner  */}
                <HomeBanner />

                {/** Featured Gurus  */}
                <Container
                    className={styles.homeContentContainer}
                    sx={{
                        mt: 6,
                        mb: 6,
                        p:0,
                        alignItems: 'center',
                    }}>
                    <div className={styles.headerContainer}>
                        <h1>Featured Gurus</h1>
                    </div>
                    <IonGrid>
                        <IonRow>
                            {
                                guruList.map((guru) => (
                                    <IonCol size="4" sizeMd='4' sizeXs='12'>
                                        <GuruCard 
                                            guru={guru}
                                        />
                                    </IonCol>
                                ))
                            }
                        </IonRow>
                    </IonGrid>
                </Container>
                
                {/* Testimonials Component */}
                <Testimonials />

                {/* Blog Component */}
                <BlogContent />

                {/* Footer */}
                <Footer />

            </IonContent>
        </>
    );
};

export default Home;
