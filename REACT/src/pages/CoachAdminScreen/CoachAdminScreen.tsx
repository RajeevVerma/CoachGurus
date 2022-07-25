import * as React from 'react';
import {
  Button,
  Container,
  FormGroup,
  Grid,
  TextareaAutosize,
} from '@mui/material';
import {
  cloudUpload,
  closeCircleOutline,
  addCircleOutline,
} from 'ionicons/icons';
import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
} from '@ionic/react';
import TextField from '@mui/material/TextField';

// Import styles
import styles from './CoachAdminScreen.module.scss';
import { useEffect, useState } from 'react';
import { IFile, IKeyValue, IUserProfile } from 'models';
import { UserSignUpSource, UserType } from 'enums';
import {
  ICategories,
  rootInterest,
} from 'pages/SignupWorkFlow/UserProfileEdit.Constants';
import { ServerHooks } from 'hooks';
import {
  ActivityPictures,
  Addresses,
  ProfilePicture,
} from 'components/CoachAdminScreen';

interface CoachAdminScreenProps {}

const CoachAdminScreen: React.FC<CoachAdminScreenProps> = () => {
  const { adminUserUpdate } = ServerHooks();
  const [rootCoaching, setRootCoaching] = useState('S');
  const [coachingOptions, setCoachingOptions] = useState<ICategories[]>(
    rootInterest.filter((x) => x.parentKey === rootCoaching)
  );
  const [selectedCoaching, setSelectedCoaching] = useState<string[]>([]);
  const [locations, setLocations] = useState<IKeyValue[]>([
    {
      key: 1,
      value: undefined,
    },
  ]);

  const [userProfile, setUserProfile] = useState<IUserProfile>({
    user: {
      bucketFolderName: '',
      mobilePhone: '',
      signUpSourceType: UserSignUpSource.Phone,
      coachingEndeavourPks: '',
      userType: UserType.Guru,
    },
    addresses: [],
  });

  const [profilePicture, setProfilePicture] = useState<IFile>();
  const [activityPicture, setActivityPicture] = useState<IFile[]>([]);

  useEffect(() => {});

  const handleRootCoachingSelection = (value: string) => {
    setRootCoaching(value);
    const coachingOptions = rootInterest
      .filter((option) => option.parentKey === value)
      .map((option) => {
        option.selected = false;
        return option;
      });
    setCoachingOptions(coachingOptions);
  };

  const handleCoachingSelection = (value: string, isChecked: boolean) => {
    let updatedCoachingOptions = rootInterest.filter(
      (option) => option.parentKey === rootCoaching
    );

    updatedCoachingOptions = updatedCoachingOptions.map((option) => {
      if (value === option.key) {
        option.selected = isChecked;
      }
      return option;
    });

    setCoachingOptions(updatedCoachingOptions);

    if (isChecked) {
      setSelectedCoaching([...selectedCoaching, value]);
    } else {
      const updatedCoachingList = selectedCoaching.filter((x) => x !== value);
      setSelectedCoaching(updatedCoachingList);
    }

    if (userProfile && userProfile.user) {
      setUserProfile({
        ...userProfile,
        user: {
          ...userProfile.user,
          coachingEndeavourPks: selectedCoaching.join('|'),
        },
      });
    }
  };

  /** Handle Adding New Address Event */
  const handleAddAddressClickEvent = () => {
    const addLocation = [...locations];
    addLocation.push({
      key: addLocation.length + 1,
      value: undefined,
    });

    setLocations(addLocation);
  };

  /** Handle Change Address Event. */
  const handleAddressChangeEvent = () => {};

  /** Handle Submit Addresses Event. */
  const handleSubmitAddressesClickEvent = () => {};

  /** Handle Profile Picture Change Event. */
  const handleProfilePictureChangeEvent = (profilePicture: IFile) => {
    setProfilePicture(profilePicture);
  };

  /** Handle Activities Picture Change Event. */
  const handleActivityPicturesChangeEvent = (activityPictures: IFile[]) => {
    setActivityPicture(activityPictures);
  };

  const handleSubmitEvent = () => {
    adminUserUpdate(userProfile).then(() => {
      setUserProfile({
        user: {
          mobilePhone: '',
          firstName: '',
          lastName: '',
          coachingEndeavourPks: '',
          profileData: {
            shortBio: '',
            qualifications: '',
            finalRatings: 0,
            yearsOfExperience: undefined,
            description: '',
          },
          bucketFolderName: '',
          signUpSourceType: UserSignUpSource.Phone,
        },
        addresses: [],
      });
    });
  };

  return (
    <IonPage>
      <section className={styles.mainContainer}>
        <Container maxWidth='lg'>
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
                  <label>What is your Name?*</label>
                  <div>
                    <TextField
                      size='small'
                      className={styles.coachAdminInput}
                      placeholder='First Name'
                      id='first-name'
                      variant='outlined'
                      value={userProfile?.user?.firstName}
                      onChange={(e) =>
                        userProfile &&
                        userProfile.user &&
                        setUserProfile({
                          ...userProfile,
                          user: {
                            ...userProfile.user,
                            firstName: e.target.value,
                          },
                        })
                      }
                    />
                    <TextField
                      size='small'
                      className={styles.coachAdminInput}
                      placeholder='Last Name'
                      id='last-name'
                      variant='outlined'
                      value={userProfile?.user?.lastName}
                      onChange={(e) =>
                        userProfile &&
                        userProfile.user &&
                        setUserProfile({
                          ...userProfile,
                          user: {
                            ...userProfile.user,
                            lastName: e.target.value,
                          },
                        })
                      }
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
                      value={userProfile?.user?.mobilePhone}
                      onChange={(e) =>
                        userProfile &&
                        userProfile.user &&
                        setUserProfile({
                          ...userProfile,
                          user: {
                            ...userProfile.user,
                            mobilePhone: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>What Coaching you wish to give?*</label>

                  <IonRadioGroup
                    className={styles.coachingGroup}
                    value={rootCoaching}
                    onIonChange={(e) =>
                      handleRootCoachingSelection(e.detail.value)
                    }>
                    <div style={{ display: 'flex' }}>
                      <IonItem className={styles.coachingGroupItem}>
                        <IonLabel className={styles.coachingGroupItem}>
                          Sports
                        </IonLabel>
                        <IonRadio slot='start' value='S' />
                      </IonItem>
                      <IonItem className={styles.coachingGroupItem}>
                        <IonLabel className={styles.coachingGroupItem}>
                          Academies
                        </IonLabel>
                        <IonRadio slot='start' value='A' />
                      </IonItem>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <IonItem className={styles.coachingGroupItem}>
                        <IonLabel className={styles.coachingGroupItem}>
                          Fitness
                        </IonLabel>
                        <IonRadio slot='start' value='F' />
                      </IonItem>
                      <IonItem className={styles.coachingGroupItem}>
                        <IonLabel className={styles.coachingGroupItem}>
                          Extra-Curricular
                        </IonLabel>
                        <IonRadio slot='start' value='E' />
                      </IonItem>
                    </div>
                  </IonRadioGroup>
                </FormGroup>
                <FormGroup
                  className={styles.inputFormGroup}
                  style={{ flexDirection: 'row' }}>
                  {coachingOptions.map((option, i) => (
                    <IonItem key={i} className={styles.coachingGroupItem}>
                      <IonLabel>{option.value}</IonLabel>
                      <IonCheckbox
                        slot='start'
                        value={option.key}
                        checked={option?.selected}
                        onIonChange={(e) =>
                          handleCoachingSelection(
                            e.detail.value,
                            e.detail.checked
                          )
                        }
                      />
                    </IonItem>
                  ))}
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
                      value={userProfile?.user?.profileData?.yearsOfExperience}
                      onChange={(e) =>
                        userProfile &&
                        userProfile.user &&
                        setUserProfile({
                          ...userProfile,
                          user: {
                            ...userProfile.user,
                            profileData: {
                              ...userProfile.user.profileData,
                              yearsOfExperience: parseInt(e.target.value, 10),
                            },
                          },
                        })
                      }
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <Addresses
                    locations={locations}
                    onAddAddressClickEvent={handleAddAddressClickEvent}
                    onAddressChangeEvent={handleAddressChangeEvent}
                    onSubmitAddressesClickEvent={
                      handleSubmitAddressesClickEvent
                    }
                  />
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
                      value={userProfile?.user?.profileData?.description}
                      onChange={(e) =>
                        userProfile &&
                        userProfile.user &&
                        setUserProfile({
                          ...userProfile,
                          user: {
                            ...userProfile.user,
                            profileData: {
                              ...userProfile.user.profileData,
                              description: e.target.value,
                            },
                          },
                        })
                      }
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
                      value={userProfile?.user?.profileData?.qualifications}
                      onChange={(e) =>
                        userProfile &&
                        userProfile.user &&
                        setUserProfile({
                          ...userProfile,
                          user: {
                            ...userProfile.user,
                            profileData: {
                              ...userProfile.user.profileData,
                              qualifications: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <ProfilePicture
                    profilePicture={profilePicture}
                    onProfilePictureChangeEvent={
                      handleProfilePictureChangeEvent
                    }
                  />
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <label>Pitch your trainee</label>
                  <div>
                    <TextareaAutosize
                      style={{ minWidth: '100%' }}
                      aria-label='minimum height'
                      minRows={3}
                      placeholder='Pitch your trainees with reason why they should choose you.'
                      value={userProfile?.user?.profileData?.shortBio}
                      onChange={(e) =>
                        userProfile &&
                        userProfile.user &&
                        setUserProfile({
                          ...userProfile,
                          user: {
                            ...userProfile.user,
                            profileData: {
                              ...userProfile.user.profileData,
                              shortBio: e.target.value,
                            },
                          },
                        })
                      }
                    />
                  </div>
                </FormGroup>
                <FormGroup className={styles.inputFormGroup}>
                  <ActivityPictures
                    activityPicture={activityPicture}
                    onActivityPicturesChangeEvent={
                      handleActivityPicturesChangeEvent
                    }
                  />
                </FormGroup>
              </div>
            </Grid>
          </Grid>
          <Grid style={{ justifyContent: 'flex-end' }} container>
            <Button
              style={{ margin: '1rem 0', background: '#2ab9c6' }}
              variant='contained'
              onClick={() => handleSubmitEvent()}>
              Save Profile
            </Button>
          </Grid>
        </Container>
      </section>
    </IonPage>
  );
};

export default CoachAdminScreen;
