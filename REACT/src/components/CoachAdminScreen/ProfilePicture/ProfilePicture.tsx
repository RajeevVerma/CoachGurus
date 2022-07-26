import { IonContent, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { closeCircleOutline, cloudUpload } from 'ionicons/icons';
import Files from 'react-files';

import { IFile } from 'models';

/**
 * Represents props for the ProfilePicture Component.
 */
interface IProfilePictureProps {
  profilePicture?: IFile;
  onProfilePictureChangeEvent: (file: IFile) => void;
}

/** Represent ProfilePicture Card Component.
 * props: IProfilePictureProps
 */
function ProfilePicture(props: IProfilePictureProps): JSX.Element {
  const { profilePicture, onProfilePictureChangeEvent } = props;

  const handleProfilePictureFilesError = (error: any) => {
    console.log(error);
  };

  return (
    <IonContent>
      <IonLabel>Upload your profile picture</IonLabel>
      <div>
        <Files
          key={'profile_pic'}
          onChange={onProfilePictureChangeEvent}
          onError={handleProfilePictureFilesError}
          accepts={['image/*']}
          multiple={false}
          maxFiles={1}
          maxFileSize={8000000}
          minFileSize={1}
          clickable>
          {profilePicture ? (
            <div className='files-gallery'>
              <img
                alt='profile-pic'
                className='files-gallery-item'
                src={profilePicture.preview?.url}
                key={profilePicture.id}
              />
              <IonIcon slot='end' icon={closeCircleOutline}></IonIcon>
            </div>
          ) : (
            <IonItem>
              <IonIcon slot='start' icon={cloudUpload}></IonIcon>
              <span>Upload Profile Picture</span>
            </IonItem>
          )}
        </Files>
      </div>
    </IonContent>
  );
}

export default ProfilePicture;
