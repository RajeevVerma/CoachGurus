import {
  IonButton,
  IonChip,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from '@ionic/react';
import { UserType } from 'enums';
import { ICognitoUser } from 'models';
import { useEffect, useState } from 'react';
import {
  ICategories,
  ISelectedCategories,
  rootInterest,
} from './UserProfileEdit.Constants';

import './UserProfileEdit.css';

interface IUserProfileEditPageProps {
  user?: ICognitoUser;
  userType: UserType;
}

interface IUserProfile {
  name?: string;
  email?: string;
  categories?: ISelectedCategories[];
}

function UserProfileEditPage(props: IUserProfileEditPageProps): JSX.Element {
  const [categories, setCategories] = useState<ICategories[]>(rootInterest);
  const [userProfile, setUserProfile] = useState<IUserProfile>();

  const handleProfileSubmit = () => {
    
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

      if (updateUserProfile !== undefined) {
        updateUserProfile.categories = [];

        updateCategories.forEach((categories) => {
          updateUserProfile?.categories?.push({
            key: categories.key,
            value: categories.value,
          });
        });
        setUserProfile({
          ...userProfile,
          categories: updateCategories,
        });
      }

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
        <IonItem>
          <IonLabel>Name</IonLabel>
          <IonInput
            value={userProfile?.name}
            type='text'
            id='user-name'
            onIonChange={(e) =>
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
