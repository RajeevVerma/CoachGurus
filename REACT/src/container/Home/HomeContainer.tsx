import { useEffect, useState } from 'react';
import { IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';

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
  UserProfileEditPage,
} from 'pages';

export const history = createBrowserHistory();

interface IContainerProps {}
const HomeContainer: React.FC<IContainerProps> = () => {
  const { getLoggedInUser, logOut } = LoginService();

  const [user, setUser] = useState<ICognitoUser | undefined>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userType, setUserType] = useState<UserType>(UserType.Trainee);

  const handleLogoutSession = () =>
    logOut().then(() => {
      history.push('/home');
    });

  history.listen(() => {
    setShowModal(false);
  });

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
  }, [getLoggedInUser]);

  const handleLoginClickEvent = (value = true, userType?: UserType) => {
    setShowModal(value);
    if (userType) {
      setUserType(userType);
    }
  };

  return (
    <IonReactRouter history={history}>
      <Header
        user={user}
        logOutSession={handleLogoutSession}
        onLoginClickEvent={handleLoginClickEvent}
      />

      <IonRouterOutlet onChange={() => handleLoginClickEvent(false)}>
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
        <Route path='/profile-edit' exact={true}>
          <UserProfileEditPage user={user} userType={userType} />
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
