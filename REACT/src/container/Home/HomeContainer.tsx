import { useEffect, useState } from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';

import { Header } from 'components';
import { UserType } from 'enums';
import { LoginService } from 'hooks';
import { ICognitoUser } from 'models';
import LoginModal from 'pages/Modals/Login/Login';
import {
  AcademicsPage,
  ExtraCurricularPage,
  HomePage,
  SportsPage,
} from 'pages';

interface IContainerProps {}
const HomeContainer: React.FC<IContainerProps> = () => {
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
    <IonReactRouter>
      <Header
        user={user}
        logOutSession={handleLogoutSession}
        onLoginClickEvent={handleLoginClickEvent}
      />
      <IonRouterOutlet>
        <Route path='/home' exact={true}>
          <HomePage />
        </Route>
        <Route path='/sports' exact={true}>
          <SportsPage />
        </Route>
        <Route path='/academics' exact={true}>
          <AcademicsPage />
        </Route>
        <Route path='/extra-curricular' exact={true}>
          <ExtraCurricularPage />
        </Route>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
      </IonRouterOutlet>

      {/* Modals */}
      <LoginModal
        showModal={showModal}
        onModalClosed={() => handleLoginClickEvent(false)}
        userType={userType}
      />
    </IonReactRouter>
  );
};

export default HomeContainer;
