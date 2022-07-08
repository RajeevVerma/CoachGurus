import {
    IonCol,
    IonContent,
    IonGrid,
    IonRow,
    IonIcon,
} from '@ionic/react';
import { Button, IconButton, InputBase, Paper, Typography } from '@mui/material';
import { search } from 'ionicons/icons';
import { Box, Container } from '@mui/system';
import LocationPicker from '../../components/Header/LocationPicker/LocationPicker';
import { BlogContent, Header, Footer, GuruCard, HomeBanner, Testimonials} from '../../components';
import './Home.scss';

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
                <div className="main-header">
                    <div className="bannerContent">
                        <Typography variant="h2">Find <br />The Best Gurus</Typography>
                        <IonRow className='search-container'>
                        <IonCol className='search-item search-locaiton-container' size='2' sizeMd='2' sizeSm='6' sizeXs='6'>
                            <LocationPicker />
                        </IonCol>

                        <IonCol className='search-item search-guru' size='4' sizeMd='4' sizeSm='6' sizeXs='6'>
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
                <Container
                sx={{
                    mt: 6,
                    mb: 6,
                    alignItems: 'center',
                }}>
                    <div className="header-container">
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
                            
                <Testimonials />
                <BlogContent />
                <Footer />

            </IonContent>

        </>
    );
};

export default Home;
