import React, { useState } from "react";
import {
    IonButton,
    IonIcon
} from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';

import { Menu, MenuItem, } from '@mui/material';

function ProfileAvatar(): JSX.Element {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <>
            <IonButton fill='clear' color='dark' onClick={handleClick}>
                <IonIcon icon={personCircleOutline} />
            </IonButton>
            <Menu
                anchorEl={anchorEl}
                id="profile-menu"
                open={anchorEl ? true : false}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            >
                <MenuItem>
                    <IonButton routerLink='/login'>Sign In</IonButton>
                </MenuItem>
                <MenuItem>
                    <IonButton routerLink='/login'>Register</IonButton>
                </MenuItem>
            </Menu>


        </>);
}

export default ProfileAvatar;