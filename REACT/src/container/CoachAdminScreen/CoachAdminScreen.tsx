import * as React from 'react';
import {
    Button,
    Card,
    Container,
    Typography,
    FormControlLabel,
    FormGroup,
    Grid,
    TextareaAutosize,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { IonIcon } from '@ionic/react';

// Import styles
import styles from './CoachAdminScreen.module.scss';

interface CoachAdminScreenProps {
}

const CoachAdminScreen: React.FC<CoachAdminScreenProps> = () => {

    const [coaching, setCoaching] = React.useState('sports');

  const handleChange = (event: SelectChangeEvent) => {
    setCoaching(event.target.value as string);
  };

    return (
        <>
            <section className={styles.mainContainer}>
                <Container maxWidth="lg">
                    <Grid container spacing={3} className={styles.profileWrapper}>
                        <Grid className={styles.boxShadowContainer} item md={6} sm={12} xs={12}>
                            {/* <h1>Personal Info</h1> */}
                            <div style={{margin:'0.5rem'}}>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>What is your Name?*</label>
                                    <div>
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="First Name"  id="first-name" variant="outlined" />
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="Last Name"  id="last-name" variant="outlined" />
                                    </div>
                                </FormGroup>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>Contact Number*</label>
                                    <div>
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="Mobile Number"  id="mobile" variant="outlined" />
                                    </div>
                                </FormGroup>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>What Coaching you wish to give?*</label>
                                    <Select
                                    style={{maxWidth:'210px'}}
                                    size="small" className={styles.coachAdminInput}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={coaching}
                                    label="Coaching"
                                    onChange={handleChange}
                                    >
                                        <MenuItem value='sports'>Sports</MenuItem>
                                        <MenuItem value='academies'>Academies</MenuItem>
                                        <MenuItem value='fitness'>Fitness</MenuItem>
                                    </Select>
                                </FormGroup>
                                <FormGroup className={styles.inputFormGroup} style={{flexDirection:'row'}}>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Cricket" />
                                    <FormControlLabel control={<Checkbox />} label="Badminton" />
                                </FormGroup>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>Overall Years of Coaching Experience <br /><span style={{fontSize:'14px'}}>(in category selected earlier)</span></label>
                                    <div>
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="Years"  id="years-of-coaching" variant="outlined" />
                                    </div>
                                </FormGroup>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>Academy Location 1</label>
                                    <div>
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="Google Location"  id="google-location-one" variant="outlined" />
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="Name"  id="location-one-name" variant="outlined" />
                                    </div>
                                </FormGroup>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>Academy Location 2</label>
                                    <div>
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="Google Location"  id="google-location-two" variant="outlined" />
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="Name"  id="location-two-name" variant="outlined" />
                                    </div>
                                </FormGroup>
                            </div>
                        </Grid>
                        <Grid className={styles.boxShadowContainer} item md={6} sm={12} xs={12}>
                            {/* <h1>Professional Info</h1> */}
                            <div style={{margin:'0.5rem'}}>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>Headline / Bio</label>
                                    <div>
                                        <TextField 
                                        style={{minWidth:'100%'}}
                                        size="small" className={styles.coachAdminInput}  placeholder="Headline"  id="headline" variant="outlined" />
                                    </div>
                                </FormGroup>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>Achievements</label>
                                    <div>
                                        <TextareaAutosize
                                            style={{minWidth:'100%'}}
                                            aria-label="minimum height"
                                            minRows={3}
                                            placeholder="Minimum 3 rows"
                                            />
                                    </div>
                                </FormGroup>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>Upload your profile pic</label>
                                    <div>
                                        <input type="file"
                                            className={styles.coachAdminProfilePhoto}
                                            name="profile"
                                            accept="image/png, image/jpeg" />
                                    </div>
                                </FormGroup>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>Pitch your trainee</label>
                                    <div>
                                        <TextareaAutosize
                                            style={{minWidth:'100%'}}
                                            aria-label="minimum height"
                                            minRows={3}
                                            placeholder="Pitch your trainees with reason why they should choose you."
                                            />
                                    </div>
                                </FormGroup>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>You in Action</label>
                                    <div>
                                        <input type="file"
                                            className={styles.coachAdminProfilePhoto}
                                            name="action-media"
                                            multiple />
                                    </div>
                                </FormGroup>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid style={{justifyContent:'flex-end'}}container>
                        <Button style={{margin:'2rem'}} variant="contained">Save Profile</Button>
                    </Grid>
                </Container>
            </section>
        </>
    );
};

export default CoachAdminScreen;
