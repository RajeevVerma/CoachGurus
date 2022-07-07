import { IonApp, setupIonicReact } from '@ionic/react';
// Import AWS Configuration
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import HomeContainer from 'container/Home/HomeContainer';

setupIonicReact();

Amplify.configure(awsconfig);

const App: React.FC = () => (
  <IonApp>
    <HomeContainer />
  </IonApp>
);

export default App;
