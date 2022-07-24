import React, {useState} from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneIcon from '@mui/icons-material/Done';

import Files from 'react-files';
import { IFile } from 'models';

import {
  IonCheckbox,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonRow,
} from '@ionic/react';
import {
    cloudUpload,
    closeCircleOutline,
    addCircleOutline,
  } from 'ionicons/icons';

// Import style 
import styles from './AdditionalActivity.module.scss';

/**
 * Represents props for the Testimonials Component.
 */
interface IAdditionalActivityProps {
    
}

/** Represent AdditionalActivity Component.
 * props: IAdditionalActivityProps
 */
function AdditionalActivity(props: IAdditionalActivityProps): JSX.Element {

    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [profilePicture, setProfilePicture] = useState<IFile[]>([]);

    const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };


    const onProfilePictureFilesChange = (files: IFile[]) => {
        console.log(files);
        setProfilePicture(files);
      };
    
    const onProfilePictureFilesError = (error: any) => {
    console.log('error code ' + error.code + ': ' + error.message);
    setProfilePicture([]);
    };

    return (
        <Grid container className={styles.profileWrapper}>
            <div className={styles.boxShadowContainer}>
                <Accordion  expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <h3 style={{margin: 0}}>
                            Additional Details
                        </h3>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Grid
                        item
                        md={12}
                        sm={12}
                        xs={12}>
                    <div style={{ margin: '0.5rem' }}>

                        <FormGroup className={styles.inputFormGroup} sx={{mb:2}}>
                            <label>Age Category</label>
                            <div>
                                <Stack direction="row" className={styles.daysSelectWrap} spacing={1} sx={{mt:1}}>
                                    <Chip
                                        label="Kids"
                                        onClick={() => {}}
                                        onDelete={() => {}}
                                        deleteIcon={<DoneIcon />}
                                    />
                                    <Chip
                                        label="Teenage"
                                        onClick={() => {}}
                                        onDelete={() => {}}
                                        deleteIcon={<DoneIcon />}
                                    />
                                    <Chip
                                        label="Adult"
                                        onClick={() => {}}
                                        onDelete={() => {}}
                                        deleteIcon={<DoneIcon />}
                                    />
                                </Stack> 
                            </div>
                        </FormGroup>

                        <FormGroup className={styles.inputFormGroup} sx={{mb:2}}>
                            <label>Level</label>
                            <div>
                                <Stack direction="row" className={styles.daysSelectWrap} spacing={1} sx={{mt:1}}>
                                    <Chip
                                        label="Beginner"
                                        onClick={() => {}}
                                        onDelete={() => {}}
                                        deleteIcon={<DoneIcon />}
                                    />
                                    <Chip
                                        label="Intermediate"
                                        onClick={() => {}}
                                        onDelete={() => {}}
                                        deleteIcon={<DoneIcon />}
                                    />
                                    <Chip
                                        label="Advanced"
                                        onClick={() => {}}
                                        onDelete={() => {}}
                                        deleteIcon={<DoneIcon />}
                                    />
                                </Stack> 
                            </div>
                        </FormGroup>


                        <FormGroup className={styles.inputFormGroup}>
                            <label>Activity Videos</label>
                            <div className={styles.fileUploadContainer}>
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
                                        <>
                                        <img
                                            alt='profile-pic'
                                            className='files-gallery-item'
                                            src={pic?.preview?.url}
                                            key={pic?.id}
                                        />
                                        <IonIcon
                                            className={styles.imageRemoveIcon}
                                            slot='end'
                                            icon={closeCircleOutline}></IonIcon>
                                        </>
                                    ))}
                                    </div>
                                ) : (
                                    <div className={styles.fileUploadBtn}>
                                    <IonIcon slot='start' icon={cloudUpload}></IonIcon>
                                    <span>Upload Videos</span>
                                    </div>
                                )}
                                </Files>
                            </div>
                            </FormGroup>

                        <FormGroup className={styles.inputFormGroup}>
                            <label>
                                Max No Of Trainees allowed
                            </label> 
                            <div>
                                <TextField
                                    style={{minWidth: '220px'}}
                                    size='small'
                                    className={styles.coachAdminInput}
                                    placeholder='Number'
                                    id='max-trainees-allowed'
                                    variant='outlined'
                                    type="text"
                                    />
                            </div>
                        </FormGroup>

                        
                        <FormGroup className={styles.inputFormGroup}>
                            <label>
                                Description
                            </label> 
                            <div>
                                <TextField
                                    style={{minWidth: '220px'}}
                                    size='small'
                                    className={styles.coachAdminInput}
                                    placeholder='Enter Description'
                                    id='description'
                                    variant='outlined'
                                    type="text"
                                    />
                            </div>
                        </FormGroup>

                        
                        <FormGroup className={styles.inputFormGroup}>
                            <label>
                                Title
                            </label> 
                            <div>
                                <TextField
                                    style={{minWidth: '220px'}}
                                    size='small'
                                    className={styles.coachAdminInput}
                                    placeholder='Enter Title'
                                    id='activity-title'
                                    variant='outlined'
                                    type="text"
                                    />
                            </div>
                        </FormGroup>

                        
                        <FormGroup className={styles.inputFormGroup}>
                            <label>
                                Fees
                            </label> 
                            <div>
                                <TextField
                                    style={{minWidth: '100px'}}
                                    size='small'
                                    className={styles.coachAdminInput}
                                    placeholder='Fees'
                                    id='fees'
                                    variant='outlined'
                                    type="text"
                                    />
                            </div>
                        </FormGroup>

                    </div>
                    </Grid>
                    </AccordionDetails>
                </Accordion>
                </div>
          </Grid>
    );
}

export default AdditionalActivity;