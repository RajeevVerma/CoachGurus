// Import modules
import { IonModal } from '@ionic/react';

// Import container
import { LoginContainer } from '../../../container';

// Import enums
import { UserType } from '../../../enums';

// Import styles
import './Login.scss';

interface ILoginModalProps {
  userType: UserType;
  showModal: boolean;
  onModalClosed: () => void;
}

function LoginModal(props: ILoginModalProps): JSX.Element {
  const { showModal, onModalClosed, userType } = props;

  return (
    <IonModal isOpen={showModal} onDidDismiss={() => onModalClosed()}>
      <LoginContainer userType={userType} />
    </IonModal>
  );
}

export default LoginModal;
