import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import { Typography, TextField } from '@mui/material';

function Copyright() {
    return (
        <React.Fragment>
            {'© '}
            <Link color="inherit" href="https://coachguru.in/">
                Coach Guru
            </Link>{' '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

export default function Footer() {
    return (
        <Typography
            component="footer"
            sx={{ display: 'flex', bgcolor: 'darkgrey' }}>
            <Container sx={{ my: 12, display: 'flex' }}>
                <Grid container spacing={10}>
                    <Grid item xs={6} sm={4} md={3}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ height: 120 }}>
                            <Grid item>
                                <Copyright />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="/premium-themes/onepirate/terms/">About Us</Link>
                            </Box>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="/premium-themes/onepirate/privacy/">Contact Us</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Legal
                        </Typography>
                        <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="/premium-themes/onepirate/terms/">Terms</Link>
                            </Box>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="/premium-themes/onepirate/privacy/">Privacy</Link>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <Typography variant="h6" gutterBottom>
                            Legal
                        </Typography>
                        <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="/premium-themes/onepirate/terms/">Terms</Link>
                            </Box>
                            <Box component="li" sx={{ py: 0.5 }}>
                                <Link href="/premium-themes/onepirate/privacy/">Privacy</Link>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Typography>
    );
}