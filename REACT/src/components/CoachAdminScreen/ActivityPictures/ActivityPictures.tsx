import { IonContent, IonLabel, IonIcon, IonItem } from '@ionic/react';
import { closeCircleOutline, cloudUpload } from 'ionicons/icons';
import Files from 'react-files';

import { IFile } from 'models';

/**
 * Represents props for the ActivityPictures Component.
 */
interface IActivityPicturesProps {
  activityPicture: IFile[];
  onActivityPicturesChangeEvent: (files: IFile[]) => void;
}

/** Represent ActivityPictures Card Component.
 * props: IActivityPicturesProps
 */
function ActivityPictures(props: IActivityPicturesProps): JSX.Element {
  const { activityPicture, onActivityPicturesChangeEvent } = props;

  const handleActivitiesPictureErrorEvent = (error: any) => {
    console.log(error);
  };

  return (
    <IonContent>
      <IonLabel>Upload your profile picture</IonLabel>
      <div>
        <Files
          key={'profile_pic'}
          onChange={onActivityPicturesChangeEvent}
          onError={handleActivitiesPictureErrorEvent}
          accepts={['image/*']}
          multiple={true}
          maxFiles={8}
          maxFileSize={8000000}
          minFileSize={1}
          clickable>
          {activityPicture.length > 0 ? (
            <div className='files-gallery'>
              {activityPicture.map((pic: IFile) => (
                <>
                  <img
                    alt='profile-pic'
                    className='files-gallery-item'
                    src={pic.preview?.url}
                    key={pic.id}
                  />
                  <IonIcon slot='end' icon={closeCircleOutline}></IonIcon>
                </>
              ))}
            </div>
          ) : (
            <IonItem>
              <IonIcon slot='start' icon={cloudUpload}></IonIcon>
              <span>Upload Activities Picture</span>
            </IonItem>
          )}
        </Files>
      </div>
    </IonContent>
  );
}

export default ActivityPictures;
