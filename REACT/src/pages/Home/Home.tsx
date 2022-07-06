import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import { useState, useEffect } from 'react';

import { Header, Footer, GuruCard, HomeBanner } from '../../components';
import { UserType } from '../../enums';
import { LoginService } from '../../hooks/login.service';
import { ICognitoUser } from '../../models';
import LoginModal from '../Modals/Login/Login';

import './Home.css';

const Home: React.FC = () => {
  const { getLoggedInUser, logOut } = LoginService();

  const [user, setUser] = useState<ICognitoUser | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userType, setUserType] = useState<UserType>(UserType.Trainee);

  const handleLogoutSession = () => logOut();

  useEffect(() => {
    const verifyUser = () => {
      getLoggedInUser()
        .then((user: ICognitoUser) => {
          setUser(user);
        })
        .catch(() => {
          setUser(undefined);
        });
    };
    verifyUser();
  }, [getLoggedInUser, user]);

  const handleLoginClickEvent = (value = true, userType?: UserType) => {
    setShowModal(value);
    if (userType) {
      setUserType(userType);
    }
  };

  return (
    <>
      <Header
        user={user}
        logOutSession={handleLogoutSession}
        onLoginClickEvent={handleLoginClickEvent}
      />
      <IonContent fullscreen={true}>
        {/** Banner  */}
        <HomeBanner />
        <div className='header-container'>
          <h3>Featured Gurus</h3>
        </div>
        <IonGrid>
          <IonRow>
            <IonCol size='4' sizeMd='4' sizeXs='12'>
              <GuruCard />
            </IonCol>
            <IonCol size='4' sizeMd='4' sizeXs='12'>
              <GuruCard />
            </IonCol>
            <IonCol size='4' sizeMd='4' sizeXs='12'>
              <GuruCard />
            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>

      <LoginModal
        showModal={showModal}
        onModalClosed={() => handleLoginClickEvent(false)}
        userType={userType}
      />
    </>
  );
};

export default Home;
