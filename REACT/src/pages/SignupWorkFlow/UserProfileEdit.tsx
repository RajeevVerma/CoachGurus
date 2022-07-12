import {
  IonButton,
  IonChip,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from '@ionic/react';
import classNames from 'classnames';
import { UserType } from 'enums';
import { ServerHooks } from 'hooks';
import { ICognitoUser, IUser } from 'models';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ICategories, rootInterest } from './UserProfileEdit.Constants';

import './UserProfileEdit.css';

interface IUserProfileEditPageProps {
  user?: ICognitoUser;
  userType: UserType;
}

function UserProfileEditPage(props: IUserProfileEditPageProps): JSX.Element {
  const { user, userType } = props;

  const history = useHistory();
  const { updateUser, getUser } = ServerHooks();
  const [categories, setCategories] = useState<ICategories[]>(
    rootInterest.filter((c) => c.parentKey === null)
  );
  const [userProfile, setUserProfile] = useState<IUser | undefined>();

  useEffect(() => {
    if (user) {
      getUser(user.username).then((data) => {
        setUserProfile(data.Item);

        let updatedCategories: ICategories[] = [
          ...categories,
          ...rootInterest.filter(
            (x) =>
              x.parentKey !== null &&
              data.Item.coachingEndeavourPks
                .split('|')
                .some((c) => c.includes(x.parentKey ?? ''))
          ),
        ];

        updatedCategories = updatedCategories.map((x) => {
          x.selected = data.Item.coachingEndeavourPks
            .split('|')
            .some((c) => c === x.key);
          return x;
        });

        setCategories(updatedCategories);
      });
    }
  }, [user]);

  const handleProfileSubmit = async () => {
    if (userProfile) {
      await updateUser(userProfile);

      history.push('/coach-profile');
    }
  };

  const handleCategoryClick = (category: ICategories) => {
    let updatedCategories: ICategories[] = [...categories];

    const hasChildOpened = categories.some((x) => x.parentKey === category.key);
    const isLeastCategory = rootInterest.some(
      (x) => x.parentKey === category.key
    );

    if (hasChildOpened) {
      updatedCategories = updatedCategories.filter(
        (x) => x.parentKey === null || !x.key.startsWith(`${category.key}-`)
      );
    } else {
      updatedCategories = [
        ...updatedCategories,
        ...rootInterest.filter((x) => x.parentKey === category.key),
      ];
    }

    let coachingEndeavourPks: string[] = [];

    if (!isLeastCategory) {
      updatedCategories = updatedCategories.map((x) => {
        x.selected = category.key === x.key;
        if (x.selected) {
          coachingEndeavourPks.push(x.key);
        }
        return x;
      });
    }
    setCategories(updatedCategories);

    if (userProfile) {
      setUserProfile({
        ...userProfile,
        coachingEndeavourPks: coachingEndeavourPks.join('|'),
      });
    }
  };

  const categorySelection = (categories: ICategories[]) => (
    <IonItem>
      {categories.map((category: ICategories) => (
        <IonChip
          className={classNames({
            'selected-category': category.selected,
          })}
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

        {userType === UserType.Guru && categorySelection(categories)}

        <IonItem>
          <IonButton onClick={() => handleProfileSubmit()}>Submit</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
}

export default UserProfileEditPage;
