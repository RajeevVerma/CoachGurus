import * as React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Files from 'react-files';
import {
  Button,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  TextareaAutosize,
} from '@mui/material';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

// Import styles
import styles from './CoachAdminScreen.module.scss';
import { useState } from 'react';
import { IFile } from 'models';

interface CoachAdminScreenProps {}

const CoachAdminScreen: React.FC<CoachAdminScreenProps> = () => {
  const [coaching, setCoaching] = React.useState('sports');
  const [location1, setLocation1] = useState('');
  const [location2, setLocation2] = useState('');

  const [profilePicture, setProfilePicture] = useState<IFile[]>([]);
  
  const [activityPicture, setActivityPicture] = useState<IFile[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setCoaching(event.target.value as string);
  };

  const onProfilePictureFilesChange = (files: IFile[]) => {
    console.log(files);
    setProfilePicture(files);
  };

  const onProfilePictureFilesError = (error: any) => {
    console.log('error code ' + error.code + ': ' + error.message);
    setProfilePicture([]);
  };

  const onActivityPictureFilesChange = (files: IFile[]) => {
    console.log(files);
    setActivityPicture(files);
  };

  const onActivityPictureFilesError = (error: any) => {
    console.log('error code ' + error.code + ': ' + error.message);
    setActivityPicture([]);
  };

  return (
    <>
      <section className={styles.mainContainer}>
        <Container maxWidth='lg'>
          <Grid container spacing={3} className={styles.profileWrapper}>
            <Grid
              className={styles.boxShadowContainer}
              item
              md={6}
              sm={12}
              xs={12}>
              {/* <h1>Personal Info</h1> */}
              <div style={{ margin: '0.5rem' }}>
                <FormGroup className={styles.inputFormGroup}>
                  <label>What is your Name?*</label>
                  <div>
                    <TextField
                      size='small'
                      className={styles.coachAdminInput}
                      placeholder='First Name'
                      id='first-name'
                      variant='outlined'
                    />
                    <TextField
                      size='small'
                      className={styles.coachAdminInput}
                      placeholder='Last Name'
                      id='last-name'
                      variant='outlined'
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>Contact Number*</label>
                  <div>
                    <TextField
                      size='small'
                      className={styles.coachAdminInput}
                      placeholder='Mobile Number'
                      id='mobile'
                      variant='outlined'
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>What Coaching you wish to give?*</label>
                  <Select
                    style={{ maxWidth: '210px' }}
                    size='small'
                    className={styles.coachAdminInput}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={coaching}
                    label='Coaching'
                    onChange={handleChange}>
                    <MenuItem value='sports'>Sports</MenuItem>
                    <MenuItem value='academies'>Academies</MenuItem>
                    <MenuItem value='fitness'>Fitness</MenuItem>
                  </Select>
                </FormGroup>
                <FormGroup
                  className={styles.inputFormGroup}
                  style={{ flexDirection: 'row' }}>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label='Cricket'
                  />
                  <FormControlLabel control={<Checkbox />} label='Badminton' />
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>
                    Overall Years of Coaching Experience <br />
                    <span style={{ fontSize: '14px' }}>
                      (in category selected earlier)
                    </span>
                  </label>
                  <div>
                    <TextField
                      size='small'
                      className={styles.coachAdminInput}
                      placeholder='Years'
                      id='years-of-coaching'
                      variant='outlined'
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>Academy Location 1</label>
                  <div>
                    <GooglePlacesAutocomplete
                      apiKey={'AIzaSyCZ2tJfShJZfqBzIRXHpPYW1cmZ5A8ODKo'}
                      selectProps={{
                        location1,
                        onChange: setLocation1,
                      }}
                      autocompletionRequest={{
                        componentRestrictions: {
                          country: ['in'],
                        },
                      }}
                    />
                    <TextField
                      size='small'
                      className={styles.coachAdminInput}
                      placeholder='Name'
                      id='location-one-name'
                      variant='outlined'
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>Academy Location 2</label>
                  <div>
                    <GooglePlacesAutocomplete
                      apiKey={'AIzaSyCZ2tJfShJZfqBzIRXHpPYW1cmZ5A8ODKo'}
                      selectProps={{
                        location2,
                        onChange: setLocation2,
                      }}
                      autocompletionRequest={{
                        componentRestrictions: {
                          country: ['in'],
                        },
                      }}
                    />
                    <TextField
                      size='small'
                      className={styles.coachAdminInput}
                      placeholder='Name'
                      id='location-two-name'
                      variant='outlined'
                    />
                  </div>
                </FormGroup>
              </div>
            </Grid>
            <Grid
              className={styles.boxShadowContainer}
              item
              md={6}
              sm={12}
              xs={12}>
              {/* <h1>Professional Info</h1> */}
              <div style={{ margin: '0.5rem' }}>
                <FormGroup className={styles.inputFormGroup}>
                  <label>Headline / Bio</label>
                  <div>
                    <TextField
                      style={{ minWidth: '100%' }}
                      size='small'
                      className={styles.coachAdminInput}
                      placeholder='Headline'
                      id='headline'
                      variant='outlined'
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>Achievements</label>
                  <div>
                    <TextareaAutosize
                      style={{ minWidth: '100%' }}
                      aria-label='minimum height'
                      minRows={3}
                      placeholder='Minimum 3 rows'
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>Upload your profile pic</label>
                  <div>
                    <Files
                      key={'profile_pic'}
                      onChange={onProfilePictureFilesChange}
                      onError={onProfilePictureFilesError}
                      accepts={['image/*']}
                      multiple={false}
                      maxFiles={1}
                      maxFileSize={10000000}
                      minFileSize={0}
                      clickable>
                      {profilePicture.length > 0 ? (
                        <div className='files-gallery'>
                          {profilePicture.map((pic: any) => (
                            <img
                              className='files-gallery-item'
                              src={pic?.preview?.url}
                              key={pic?.id}
                            />
                          ))}
                        </div>
                      ) : (
                        <div>Upload Profile Picture</div>
                      )}
                    </Files>
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>Pitch your trainee</label>
                  <div>
                    <TextareaAutosize
                      style={{ minWidth: '100%' }}
                      aria-label='minimum height'
                      minRows={3}
                      placeholder='Pitch your trainees with reason why they should choose you.'
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>You in Action</label>
                  <div>
                  <Files
                      key={'activity_pic'}
                      onChange={onActivityPictureFilesChange}
                      onError={onActivityPictureFilesError}
                      accepts={['image/*']}
                      multiple={true}
                      maxFiles={8}
                      maxFileSize={10000000}
                      minFileSize={0}
                      clickable>
                      {activityPicture.length > 0 ? (
                        <div className='files-gallery'>
                          {activityPicture.map((pic: any) => (
                            <img
                              className='files-gallery-item'
                              src={pic?.preview?.url}
                              key={pic?.id}
                            />
                          ))}
                        </div>
                      ) : (
                        <div>Upload Activity Picture (Max 8 Allowed)</div>
                      )}
                    </Files>
                  </div>
                </FormGroup>
              </div>
            </Grid>
          </Grid>
          <Grid style={{ justifyContent: 'flex-end' }} container>
            <Button style={{ margin: '2rem' }} variant='contained'>
              Save Profile
            </Button>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default CoachAdminScreen;
