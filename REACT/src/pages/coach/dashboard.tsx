import { 
    IonContent, 
    IonPage 
} from "@ionic/react";

import { 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    Container, 
    Grid, 
    Typography 
} from "@mui/material";

import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import styles from './dashboard.module.scss';

const CoachDashboard: React.FC = () => {
    return (
        <IonPage>
            <IonContent>
                <section className={styles.pageContainer}>
                    <Container maxWidth="lg">
                        <Grid container>
                            <Grid item md={4} sm={12} xs={12}>
                                <Card sx={{ minWidth: 275, m: '0.5em' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            <LocationOnOutlinedIcon sx={{ color: 'success.main', mb: '-5px', display: 'inline-flex' }} />
                                            Location 1
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Address
                                        </Typography>
                                        <Typography variant="body2">
                                            Activities: 2
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{flexDirection: 'row-reverse'}}>
                                        <Button size="small">
                                            <AddCircleOutlineIcon sx={{ color: 'success.main'}} />
                                            Activity
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item md={4} sm={12} xs={12}>
                                <Card sx={{ minWidth: 275, m: '0.5em'  }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            <LocationOnOutlinedIcon sx={{ color: 'success.main', mb: '-5px', display: 'inline-flex' }} />
                                            Location 2
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Address
                                        </Typography>
                                        <Typography variant="body2">
                                            Activities: 3
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{flexDirection: 'row-reverse'}}>
                                        <Button size="small">
                                            <AddCircleOutlineIcon sx={{ color: 'success.main'}} />
                                            Activity
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item md={4} sm={12} xs={12}>
                                <Card sx={{ minWidth: 275, m: '0.5em'  }}>
                                    <CardContent>
                                        <Typography variant="h5" component="div">
                                            <LocationOnOutlinedIcon sx={{ color: 'success.main', mb: '-5px', display: 'inline-flex' }} />
                                            Location 3
                                        </Typography>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            Address
                                        </Typography>
                                        <Typography variant="body2">
                                            Activities: 4
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{flexDirection: 'row-reverse'}}>
                                        <Button size="small">
                                            <AddCircleOutlineIcon sx={{ color: 'success.main'}} />
                                            Activity
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </section>
            </IonContent>
        </IonPage>
    );
}

export default CoachDashboard;