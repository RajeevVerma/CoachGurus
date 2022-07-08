import { Button, IconButton, InputBase, Paper, Typography } from '@mui/material';
import { IonCol, IonIcon, IonRow } from '@ionic/react';
import { search } from 'ionicons/icons';
import './HomeBanner.css';
import { Box, Container } from '@mui/system';
import LocationPicker from '../Header/LocationPicker/LocationPicker';
import SportCategories from '../SportCategories/SportCategories';

const sportCategories = [
    {
        imageUrl: `${process.env.PUBLIC_URL}/assets/images/badminton.png`,
        category: 'Badminton'
    },
    {
        imageUrl: `${process.env.PUBLIC_URL}/assets/images/swimming.png`,
        category: 'Swimming'
    },
    {
        imageUrl: `${process.env.PUBLIC_URL}/assets/images/basketball.png`,
        category: 'Basketball'
    },
    {
        imageUrl: `${process.env.PUBLIC_URL}/assets/images/chess.png`,
        category: 'Chess'
    },
    {
        imageUrl: `${process.env.PUBLIC_URL}/assets/images/cricket.png`,
        category: 'Cricket'
    },
    {
        imageUrl: `${process.env.PUBLIC_URL}/assets/images/tennis.png`,
        category: 'Tennis'
    },
];

export default function HomeBanner() {
    return (
            <Container
                sx={{
                    mt: 3,
                    mb: 3,
                    alignItems: 'center',
                }}>
                {/* <Typography color="inherit" align="center" sx={{ typography: { sm: 'h2', xs: 'h4' } }}>
                    Find the best gurus
                </Typography>
                <IonRow className='search-container'>
                    <IonCol className='search-locaiton-container' size='2' sizeMd='2' sizeSm='6' sizeXs='6'>
                        <LocationPicker />
                    </IonCol>

                    <IonCol size='8' sizeMd='6' sizeSm='6' sizeXs='6'>
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

                    <IonCol size='2' sizeMd='2' sizeSm='6' sizeXs='6'>
                        <Button variant='contained' size='large' sx={{ height: 48 }}>Find Guru</Button>
                    </IonCol>
                </IonRow> */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: 'common.black',
                        opacity: 0.5,
                        zIndex: -1,
                    }} />

                {/** Show categories, only for the web */}
                <SportCategories customClassName='sport-categories' categories={sportCategories} />

            </Container>
    );
}