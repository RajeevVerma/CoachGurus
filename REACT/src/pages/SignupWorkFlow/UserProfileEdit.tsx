import {
  IonChip,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from '@ionic/react';
import { UserType } from 'enums';
import { ICognitoUser } from 'models';
import { useState } from 'react';

import './UserProfileEdit.css';

interface IUserProfileEditPageProps {
  user?: ICognitoUser;
  userType: UserType;
}

interface ICategories {
  value: string;
  key: string;
  selected?: boolean;
  child?: ICategories[];
}

const rootInterest: ICategories[] = [
  {
    key: 'S-1',
    value: 'Sports',
    child: [
      {
        key: 'S-1-1',
        value: 'Cricket',
      },
      {
        key: 'S-1-2',
        value: 'Volleyball',
      },
      {
        key: 'S-1-3',
        value: 'Badminton',
      },
    ],
  },
  {
    key: 'A-1',
    value: 'Academics',
    child: [
      {
        key: 'A-1-1',
        value: 'Maths',
        child: [
          {
            key: 'A-1-1-1',
            value: 'Primary School',
          },
        ],
      },
    ],
  },
  {
    key: 'E-1',
    value: 'Extra-Curricular',
  },
];

function UserProfileEditPage(props: IUserProfileEditPageProps): JSX.Element {
  let [categories, setCategories] = useState<ICategories[]>(rootInterest);

  const handleCategoryClick = (category: ICategories) => {
    const categoryIndex = categories.findIndex((x) => x.key === category.key);

    if (categoryIndex > -1 && Array.isArray(category.child)) {
      if (categories[categoryIndex].selected) {
        categories[categoryIndex].selected = false;
        categories = categories.filter(
          (x) => !x.key.startsWith(`${category.key}-`)
        );
      } else {
        categories[categoryIndex].selected = true;
        categories = [...categories, ...category.child];
      }
      setCategories(categories);
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
          <IonInput type='text' id='user-name' />
        </IonItem>

        <IonItem>
          <IonLabel>Phone Number (WhatsApp)</IonLabel>
          <IonInput type='tel' id='user-tel' />
        </IonItem>

        <IonItem>
          <IonLabel>Email</IonLabel>
          <IonInput type='email' id='user-email' />
        </IonItem>

        <IonItem>
          <IonLabel>User Type</IonLabel>
          <IonInput type='text' id='user-type' />
        </IonItem>

        {categorySelection(categories)}
      </IonContent>
    </IonPage>
  );
}

export default UserProfileEditPage;