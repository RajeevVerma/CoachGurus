import { IonCol, IonContent, IonGrid, IonRow } from '@ionic/react';
import { useState, useEffect } from 'react';

import { Header, Footer, GuruCard, HomeBanner } from '../../components';
import { LoginService } from '../../hooks/login.service';
import { ICognitoUser } from '../../models';

import './Home.css';

const Home: React.FC = () => {
  const { getLoggedInUser, logOut } = LoginService;

  const [user, setUser] = useState<ICognitoUser | undefined>();
  
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
  }, [getLoggedInUser,user]);


  return (
    <>
      <Header user={user} logOutSession={handleLogoutSession} />
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
    </>
  );
};

export default Home;
