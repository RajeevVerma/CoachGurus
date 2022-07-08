import React from 'react';
import {
    Box,
    Grid,
    Card,
    Container,
    Typography,
} from '@mui/material';

// Import style 
import './Testimonials.scss';


/**
 * Represents props for the Testimonials Component.
 */
interface ITestimonialsProps {
    
}

/** Represent Testimonials Component.
 * props: ITestimonialsProps
 */
function Testimonials(props: ITestimonialsProps): JSX.Element {

    const quoteImg =  `${process.env.PUBLIC_URL}/assets/images/quote.jpg`;

    return (
        <section className="testimonialsWrap">
            <Container maxWidth="lg">
                <h1>What people say</h1>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid className="gridContainer" container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Card className="boxShadowContainer">
                                
                                <p>
                                <img src={quoteImg} alt="quote-icon"/>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Card className="boxShadowContainer">
                                <p>
                                <img src={quoteImg} alt="quote-icon"/>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </section>
    );
}

export default Testimonials;