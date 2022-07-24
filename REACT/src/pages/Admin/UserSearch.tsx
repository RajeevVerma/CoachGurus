import { 
    IonContent, 
    IonPage 
} from "@ionic/react";

import { 
    Button, 
    Container, 
    FormGroup, 
    Grid,
    TextField,
} from "@mui/material";

import React, { useState } from "react";
import { ServerHooks } from "hooks/server-hooks";

// Import styles
import styles from '../../contents/styles/common.module.scss';
import { IUser } from "models/user.interface";


const UserSearch: React.FC = () => {

    const { getUser } = ServerHooks();
    
    const [PhoneNumber, setPhoneNumber] = useState('');

    const [rows, setRows] = useState<IUser[]>([]);

    const handleUserSearch = async () => {
        if(PhoneNumber && PhoneNumber !== ''){
            await getUser(PhoneNumber).then((data)=> {
                console.log(data.Item);
                if(data && data.Item && Object.keys( data.Item).length>0)
                    setRows([data.Item]);
                else
                    setRows([]);
            });
        }
    };

    const handleClearSearch = ()=> {
        setPhoneNumber('');
        setRows([]);
    }

    return (
    <IonPage>
        <IonContent>
            <h1>User Search</h1>
            <section className={styles.pageContainer}>
                <Container maxWidth="lg">
                    <Grid container spacing={3} className={styles.profileWrapper}>
                        <Grid className={styles.boxShadowContainer} item md={12} sm={12} xs={12}>
                            {/* <h1>Personal Info</h1> */}
                            <div style={{margin:'0.5rem'}}>
                                <FormGroup className={styles.inputFormGroup}>
                                    <label>Search user by first name, last name or phone number</label>
                                    <div>
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="First Name"  id="first-name" variant="outlined" />
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="Last Name"  id="last-name" variant="outlined" />
                                        <TextField size="small" className={styles.coachAdminInput}  placeholder="Phone Number"  id="phone-number" variant="outlined" 
                                        value={PhoneNumber} onChange={ (e) => setPhoneNumber(`${e.target.value}`)}/>
                                        <Button style={{margin:'0.7rem 0'}} variant="contained" onClick={() => handleUserSearch()}>Search</Button>
                                        <Button style={{margin:'0.7rem 0 0.7rem 0.7rem'}} variant="contained" onClick={() => handleClearSearch()}>Clear</Button>
                                    </div>
                                </FormGroup>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
                <Container maxWidth="lg">
                    <Grid container spacing={3} className={styles.boxShadowContainer} style={{marginTop:'0.7rem'}} item xs={12}>

                        <Grid container>
                            <Grid item md={3} sm={12} xs={12}>
                                <label>Phone Number</label>
                            </Grid>
                            <Grid item md={3} sm={12} xs={12}>
                                <label>Name</label>
                            </Grid>
                            <Grid item md={3} sm={12} xs={12}>
                                <label>User Type</label>
                            </Grid>
                            <Grid item md={3} sm={12} xs={12}>
                                <label>Verified</label>
                            </Grid>
                            {
                                Array.from(rows).map((user, index) => (
                                    <React.Fragment>
                                        <Grid item md={3} sm={12} xs={12}>
                                            {user?.mobilePhone}
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12}>
                                            {user?.firstName} {user?.lastName}
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12}>
                                            {user?.userType}
                                        </Grid>
                                        <Grid item md={3} sm={12} xs={12}>
                                            {user?.isCoachGuruVerified?'Yes':'No'}
                                        </Grid>
                                    </React.Fragment>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Container>
            </section>
        </IonContent>
    </IonPage>
    );
}

export default UserSearch;