import {
  IonButton,
  IonChip,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from '@ionic/react';
import { UserSignUpSource } from 'enums';
import { ServerHooks } from 'hooks';
import { ICognitoUser, IUser } from 'models';
import { useEffect, useState } from 'react';
import { ICategories, rootInterest } from './UserProfileEdit.Constants';

import './UserProfileEdit.css';

interface IUserProfileEditPageProps {
  user?: ICognitoUser;
}

function UserProfileEditPage(props: IUserProfileEditPageProps): JSX.Element {
  const { user } = props;

  const { updateUser, getUser } = ServerHooks();
  const [categories, setCategories] = useState<ICategories[]>(rootInterest);
  const [userProfile, setUserProfile] = useState<IUser | undefined>();

  useEffect(() => {
    if (user) {
      getUser(user.username).then((data) => {
        setUserProfile(data.Item);
      });
    }
  }, [user]);

  const handleProfileSubmit = () => {
    if (userProfile) {
      updateUser(userProfile);
    }
  };

  const handleCategoryClick = (category: ICategories) => {
    let updateUserProfile = userProfile;
    let updateCategories = [...categories];
    const categoryIndex = updateCategories.findIndex(
      (x) => x.key === category.key
    );

    if (categoryIndex > -1 && Array.isArray(category.child)) {
      if (updateCategories[categoryIndex].selected) {
        updateCategories[categoryIndex].selected = false;
        updateCategories = updateCategories.filter(
          (x) => !x.key.startsWith(`${category.key}-`)
        );
      } else {
        updateCategories[categoryIndex].selected = true;
        updateCategories = [...updateCategories, ...category.child];
      }
      let coachingEndeavourPks: string[] = [];

      updateCategories.forEach((categories) => {
        if (updateUserProfile !== undefined) {
          coachingEndeavourPks.push(categories.key);
        }
      });
      setUserProfile({
        ...userProfile,
        mobilePhone: '',
        signUpSourceType: UserSignUpSource.Phone,
        coachingEndeavourPks: coachingEndeavourPks.join('|'),
      });

      setCategories(updateCategories);
    }
  };

  const categorySelection = (categories: ICategories[]) => (
    <IonItem>
      {categories.map((category: ICategories) => (
        <IonChip
          key={category.key}
          onClick={() => handleCategoryClick(category)}>
          <IonLabel>{category.value}</IonLabel>
        </IonChip>
      ))}
    </IonItem>
  );

  return (
    <IonPage className='user-profile'>
      <IonContent fullscreen={false}>
        {userProfile?.mobilePhone}

        <IonItem>
          <IonLabel>Name</IonLabel>
          <IonInput
            value={userProfile?.name}
            type='text'
            id='user-name'
            onIonChange={(e) =>
              userProfile &&
              setUserProfile({ ...userProfile, name: `${e.target.value}` })
            }
          />
        </IonItem>

        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput
            value={userProfile?.email}
            type='email'
            id='user-email'
            onIonChange={(e) =>
              userProfile &&
              setUserProfile({ ...userProfile, email: `${e.target.value}` })
            }
          />
        </IonItem>

        {categorySelection(categories)}

        <IonItem>
          <IonButton onClick={() => handleProfileSubmit()}>Submit</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
}

export default UserProfileEditPage;
