import React, { useState } from 'react';
import { IonButton, IonIcon, IonImg } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';

import { Menu, MenuItem } from '@mui/material';

// import models
import { ICognitoUser } from '../../../models';
import { UserType } from '../../../enums';

export interface IProfileAvatarProps {
  user?: ICognitoUser;
  logOutSession?: () => void;
  onLoginClickEvent?: (showModal: boolean, userType: UserType) => void;
}

function ProfileAvatar(props: IProfileAvatarProps): JSX.Element {
  const { user, logOutSession, onLoginClickEvent } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return !user?.signInUserSession ? (
    <>
      <IonButton
        fill='clear'
        color='dark'
        onClick={() =>
          onLoginClickEvent && onLoginClickEvent(true, UserType.Trainee)
        }>
        <IonIcon icon={personCircleOutline} />
      </IonButton>
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
            Sign Out
          </IonButton>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ProfileAvatar;
