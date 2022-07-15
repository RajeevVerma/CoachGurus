import './HomeBanner.css';
import { Box, Container } from '@mui/system';
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
                className="homeBannerContainer"
                sx={{
                    mt: 3,
                    mb: 3,
                    alignItems: 'center',
                }}>
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