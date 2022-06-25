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
                id="account-menu"
                open={anchorEl ? true : false}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
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