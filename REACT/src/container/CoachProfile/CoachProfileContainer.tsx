import React from 'react';
import {
    Box,
    Grid,
    Card,
    CardMedia,
    Container,
    Rating,
    Stack,
    Typography,
    List,
    ListItem,
    Link,
} from '@mui/material';
import { useEffect } from 'react';
import * as qs from 'query-string';

import { image, pin } from 'ionicons/icons';

// Import styles
import './CoachProfileContainer.scss';

// Import Image
import { CoachProfile, CoachLocation } from '../../contents';

// Import Components
import { Header } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getCoachProfile } from './coachProfile.actions';
import { IApplicationState } from 'store';
import awsConstants from 'models/shared/aws-constants';
import { IonButton, IonContent, IonIcon, IonImg, IonSlide, IonSlides } from '@ionic/react';

interface ContainerProps {
}

const CoachProfileContainer: React.FC<ContainerProps> = () => {

    const parsed = qs.parse(window.location.search);
    console.debug('props pk', parsed.pk);

    const dispatch = useDispatch();
    const guru = useSelector((state: IApplicationState) => state.App.guruProfile);

    const userPk = parsed.pk as string;

    useEffect(() => {
        dispatch(getCoachProfile(userPk));
    }, [dispatch, userPk]);

    useEffect(() => {
        if (userPk) {
            // getGuruLocations(userPk);
        }
    }, [userPk]);

    const images: string[] | undefined = guru?.profileData?.coachingPhotos?.split('|');

    /** To load guru locations */
    // const getGuruLocations = (userPk: string) => {
    //     const result: IAddress[] = requestData(
    //         `${getBaseUrl()}${ApiUrls.Get_Url_Root}${ApiUrls.Get_Coach_Url}${profileAction.payload.pk}`,
    //         undefined,
    //         (response) => response.Item as IAddress[]
    //     );
    // }

    // async function createMap() {
    //     if (!mapRef.current) return;

    //     newMap = await GoogleMap.create({
    //         id: 'my-cool-map',
    //         element: mapRef.current,
    //         /** Google Maps API Key is needed */
    //         apiKey: 'process.env.REACT_APP_YOUR_API_KEY_HERE',
    //         config: {
    //             center: {
    //                 lat: 33.6,
    //                 lng: -117.9
    //             },
    //             zoom: 8
    //         }
    //     })
    // }

    const slideOpts = {
        initialSlide: 1,
        speed: 400,
        slidesPerView: 1.5,
        autoplay: true
    };


    return (
        <>
            <Header />
            <section className='mainContainer'>
                <Container maxWidth="lg">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid className="gridContainer" container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <Card className="coachProfileCard">
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
                                <Grid style={{ marginTop: '2rem', color: 'black' }} className="boxShadowContainer" container>
                                    <Grid item xs={12} md={12}>
                                        <div>
                                            <p><b>Achievements:</b></p>
                                            <ul>
                                                <li>{guru?.profileData?.certifications}</li>
                                            </ul>
                                            <p><b>Currently Associated With:</b></p>
                                            <ul>
                                                <li>Unique Academy</li>
                                                <li>Ace Academy</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p>{guru?.profileData?.description}</p>
                                        </div>
                                    </Grid>
                                </Grid>
                                {images &&
                                    <Grid style={{ marginTop: '2rem', color: 'black', height: '400px' }} className="boxShadowContainer" container>
                                        <IonSlides pager={true} options={slideOpts}>
                                            {
                                                images.map((x) => {
                                                    return <IonSlide>
                                                        <IonImg src={awsConstants.getUserCoachingPictureUri(guru?.bucketFolderName, x)} />
                                                    </IonSlide>
                                                })
                                            }
                                        </IonSlides>
                                    </Grid>
                                }
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <div className="boxShadowContainer">
                                    <h3>Training Locations</h3>
                                    <List className="trainingLocationsWrap">
                                        <ListItem sx={{ p: 0 }} className="trainingLocation">
                                            <Link className="">
                                                <IonIcon icon={pin}></IonIcon>
                                                <Typography>
                                                    <span className="locationTitle">
                                                        The Pune Academy
                                                    </span>
                                                    <span>Lavale, Pune</span>
                                                </Typography>
                                            </Link>
                                        </ListItem>

                                        <ListItem sx={{ p: 0 }} className="trainingLocation">
                                            <Link className="">
                                                <IonIcon icon={pin}></IonIcon>
                                                <Typography>
                                                    <span className="locationTitle">
                                                        The Great Cricket Academy
                                                    </span>
                                                    <span>Yerawada, Pune</span>
                                                </Typography>
                                            </Link>
                                        </ListItem>

                                    </List>
                                    {/* <img style={{ borderRadius: '5px' }} src={CoachLocation} alt="Coach Locations" /> */}
                                    {/** To Do for fetching Locations List */}
                                    {/* <div className="component-wrapper">
                                        <capacitor-google-map ref={mapRef} style={{
                                            display: 'inline-block',
                                            width: 275,
                                            height: 400
                                        }}></capacitor-google-map>

                                        <button onClick={createMap}>Create Map</button>
                                    </div> */}
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </section>
        </>
    );
};

export default CoachProfileContainer;

