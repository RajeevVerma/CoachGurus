import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardMedia,
    Container,
    Typography,
} from '@mui/material';

// Import style 
import './BlogContent.scss';

/**
 * Represents props for the Testimonials Component.
 */
interface IBlogContentProps {
    
}

/** Represent BlogContent Component.
 * props: IBlogContentProps
 */
function BlogContent(props: IBlogContentProps): JSX.Element {

    const blog_img_one =  `${process.env.PUBLIC_URL}/assets/images/blog_1.jpg`;
    const blog_img_two =  `${process.env.PUBLIC_URL}/assets/images/blog_2.jpg`;
    const blog_img_three =  `${process.env.PUBLIC_URL}/assets/images/blog_3.jpg`;

    return (
        <section className="blogsWrap">
            <Container maxWidth="lg">
                <h1>Sports Insights</h1>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid className="gridContainer" container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Card className="boxShadowContainer">
                                <CardMedia 
                                    component="img"
                                    image={blog_img_one}
                                    alt="Coach Profile"
                                />
                                <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className="boxShadowContainer">
                                <CardMedia 
                                    component="img"
                                    image={blog_img_two}
                                    alt="Coach Profile"
                                />
                                <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Card className="boxShadowContainer">
                                <CardMedia 
                                    component="img"
                                    image={blog_img_three}
                                    alt="Coach Profile"
                                />
                                <p>
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

export default BlogContent;