import React, { useState } from 'react';
import { IonButton, IonIcon, IonImg } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';

import { Menu, MenuItem } from '@mui/material';

// import models
import { ICognitoUser } from '../../../models';

export interface IProfileAvatarProps {
  user?: ICognitoUser;
  logOutSession?: () => void;
}

function ProfileAvatar(props: IProfileAvatarProps): JSX.Element {
  const { user, logOutSession } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return !user?.signInUserSession ? (
    <>
      <IonButton fill='clear' color='dark' onClick={handleClick}>
        <IonIcon icon={personCircleOutline} />
      </IonButton>
      <Menu
        anchorEl={anchorEl}
        id='profile-menu'
        open={anchorEl ? true : false}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        <MenuItem>
          <IonButton routerLink='/login'>Sign In</IonButton>
        </MenuItem>
        <MenuItem>
          <IonButton routerLink='/login'>Register</IonButton>
        </MenuItem>
      </Menu>
    </>
  ) : (
    <>
      <IonButton fill='clear' color='dark' onClick={handleClick}>
        {user?.signInUserSession.idToken.payload.name}
        <IonIcon icon={personCircleOutline} />
      </IonButton>
      <Menu
        anchorEl={anchorEl}
        id='profile-menu'
        open={anchorEl ? true : false}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}>
        <MenuItem>
          <IonButton onClick={() => logOutSession && logOutSession()}>
            Logout
          </IonButton>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileAvatar;
