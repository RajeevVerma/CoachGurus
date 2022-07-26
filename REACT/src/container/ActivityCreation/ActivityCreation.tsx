import * as React from 'react';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete';
import {
  Button,
  Chip,
  Container,
  FormControl,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { 
  LocalizationProvider, 
  MobileDatePicker, 
  TimePicker,
} from '@mui/x-date-pickers';

import { addCircle } from 'ionicons/icons';
import {
  IonCheckbox,
  IonIcon,
  IonItem,
  IonLabel,
} from '@ionic/react';

// Import styles
import styles from './ActivityCreation.module.scss';
import { useEffect, useState } from 'react';

// Import Components
import { AdditionalActivity } from '../../components'

interface ActivityCreationProps {}

const ActivityCreation: React.FC<ActivityCreationProps> = () => {

  const [location1, setLocation1] = useState();
  useEffect(() => {});

  const handleGoogleLocationChange = (location: any) => {
    setLocation1(location);
    geocodeByPlaceId(location.value.place_id)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Successfully got latitude and longitude', { lat, lng });
      });
  };
  const locationStyle = (provided: any) => ({
    ...provided,
    color: '#232e4d',
  });

  const handleSubmitEvent = () => {
    
  };

  /** Add Location Handling */
  const [location, setLocation] = React.useState('nerawada');

  const handleLocationChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setLocation(event.target.value);
  };

  const [value, setValue] = React.useState<Date | null>(null);


  /** Activity Start Date Handling */
  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date('2014-08-18T21:11:54'),
  );

  const handleStartDateChange = (newValue: Date | null) => {
    setStartDate(newValue);
  };

  /** Activity Days */
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <>
      <section className={styles.mainContainer}>
        
        <Container maxWidth='lg'>
            <h2>Activity Creation</h2>
          <Grid container className={styles.profileWrapper}>
            <Grid
              className={styles.boxShadowContainer}
              item
              md={6}
              sm={12}
              xs={12}>
              {/* <h1>Personal Info</h1> */}
              <div style={{ margin: '0.5rem' }}>
                <FormGroup className={styles.inputFormGroup}>
                  <label>Category</label>
                  <div>
                    <TextField
                      size='small'
                      className={styles.coachAdminInput}
                      placeholder='Category'
                      id='category'
                      variant='outlined'
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>Location</label>
                  <div>
                  <FormControl className={styles.addLocationContainer}>
                        <Select
                            size='small'
                            style={{minWidth: '220px'}}
                            className={styles.coachAdminInput}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={location}
                            onChange={handleLocationChange}
                        >
                            <MenuItem value={'nerawada'}>Nerawada</MenuItem>
                            <MenuItem value={'lonawala'}>Lonawala</MenuItem>
                        </Select>
                        <div className={styles.iconWrap}>
                            <IonIcon slot='end' icon={addCircle}></IonIcon>
                        </div>
                    </FormControl>
                  </div>
                </FormGroup>
                <FormGroup style={{maxWidth:'400px'}} sx={{mb:1}} className={styles.inputFormGroup}>
                  <label>Enter New Location</label>
                  <div className={styles.googleInputWrap}>
                    <GooglePlacesAutocomplete
                      apiKey={'AIzaSyCZ2tJfShJZfqBzIRXHpPYW1cmZ5A8ODKo'}
                      selectProps={{
                        location1,
                        onChange: handleGoogleLocationChange,
                        styles: {
                          input: locationStyle,
                          option: locationStyle,
                          singleValue: locationStyle,
                        },
                      }}
                      autocompletionRequest={{
                        componentRestrictions: {
                          country: ['in'],
                        },
                        types: ['address'],
                      }}
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                    <label>Start Date</label>
                    <div className={styles.timeInputFormGroup} >
                      <LocalizationProvider style={{minWidth: '220px'}} dateAdapter={AdapterDateFns}>
                        <MobileDatePicker
                            className={styles.coachAdminInput}
                            inputFormat="MM/dd/yyyy"
                            value={startDate}
                            onChange={handleStartDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup} sx={{mb:1}}>
                    <label>Select Days</label>
                    <div>
                        <Stack direction="row" className={styles.daysSelectWrap} spacing={1} sx={{mt:1}}>
                            <Chip
                                label="Monday"
                                onClick={handleClick}
                                onDelete={handleDelete}
                                deleteIcon={<DoneIcon />}
                            />
                            <Chip
                                label="Tuesday"
                                onClick={handleClick}
                                onDelete={handleDelete}
                                deleteIcon={<DoneIcon />}
                            />
                            <Chip
                                label="Wednesday"
                                onClick={handleClick}
                                onDelete={handleDelete}
                                deleteIcon={<DoneIcon />}
                            />
                        </Stack> 
                    </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup} style={{margin:'1rem 0 0.5rem 0'}}>
                 <label>
                    Time
                  </label> 
                </FormGroup>
                <div style={{display: 'flex', gap: '10px'}}>
                    <FormGroup className={styles.inputFormGroup}>
                    <label>
                        Start Time
                    </label>
                    <div className={styles.timeInputFormGroup}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <TimePicker
                            value={value}
                            onChange={(newValue) => {
                              setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                    </div>
                    </FormGroup>
                    <FormGroup className={styles.inputFormGroup}>
                      <label>
                          End Time
                      </label>
                      <div className={styles.timeInputFormGroup}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={(params) => <TextField {...params} />}
                            />
                          </LocalizationProvider>
                      </div>
                    </FormGroup>
                </div>
                <FormGroup className={styles.inputFormGroup}>
                    <IonItem className={styles.coachingGroupItem}>
                        <IonCheckbox
                            slot='start'
                            checked={true}
                        />
                        <IonLabel>Don't Send this activity Information to Trainees</IonLabel>
                      </IonItem>
                </FormGroup>
              </div>
            </Grid>
            {/* Additional Activity */}
            <Grid
              item
              md={6}
              sm={12}
              xs={12}>
                <AdditionalActivity />
              </Grid>
          </Grid>


          <Grid style={{ justifyContent: 'flex-end' }} container>
            <Button
              style={{ margin: '1rem 0', background: '#2ab9c6' }}
              variant='contained'
              onClick={() => handleSubmitEvent()}>
              Create Activity
            </Button>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default ActivityCreation;
