
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGuruList } from './guruList.actions';
import { IApplicationState } from 'store';
import { Box, Card, CardMedia, Container, Grid, Rating, Stack, Typography } from '@mui/material';
import awsConstants from 'models/shared/aws-constants';
import * as qs from 'query-string';

interface ICoachListProps {

};

const GuruListContainer: React.FC<ICoachListProps> = () => {
    const params = qs.parse(window.location.search);
    const endeavour = params.endeavour as string;
    const lat = params.lat as string;
    const long = params.long as string;
    const dispatch = useDispatch();
    const gurus = useSelector((applicationState: IApplicationState) => applicationState.GuruList.gurus);

    useEffect(() => {
        console.log('Fetching...', lat, long, endeavour);
        dispatch(getGuruList(lat, long, endeavour));
    }, [lat, long, endeavour, dispatch])

    return (
        <section className='mainContainer'>
            <Container maxWidth="lg">

                <h3>Gurus</h3>
                {
                    gurus.map((guru, i, arr) =>
                        <Card key={`guru-${i}`} className="coachProfileCard">
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <CardMedia
                                        component="img"
                                        image={awsConstants.getUserProfilePictureUri(guru?.bucketFolderName, guru?.profilePicUrl)}
                                        alt="Coach Profile"
                                    />
                                </Grid>
                                <Grid style={{ padding: '1rem' }} item xs={12} md={6}>
                                    <Typography variant="body1">
                                        <h1>{`${guru?.firstName} ${guru?.lastName}`}</h1>
                                        <Stack spacing={1}>
                                            <Rating name="half-rating" value={guru?.profileData?.finalRatings} defaultValue={4.5} precision={0.5} />
                                        </Stack>
                                        <p>8 Years of Exp</p>
                                        <p>{guru?.profileData?.description}</p>
                                        <p><b>Short Bio...</b> {guru?.profileData?.shortBio}</p>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    )
                }

            </Container>
        </section>
    );
}

export default GuruListContainer;