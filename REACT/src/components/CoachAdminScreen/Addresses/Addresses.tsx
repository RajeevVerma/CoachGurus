import { IonButton, IonContent, IonIcon, IonLabel } from '@ionic/react';
import { addCircleOutline, cloudDoneOutline } from 'ionicons/icons';

import { IKeyValue } from 'models';
import { IAddress } from 'models/address.model';
import Address from './Address/Address';

/**
 * Represents props for the Addresses Component.
 */
interface IAddressesProps {
  locations: IKeyValue[];
  onAddAddressClickEvent: () => void;
  onSubmitAddressesClickEvent: () => void;
  onAddressChangeEvent: (address: IAddress) => void;
}

/** Represent Addresses Card Component.
 * props: IAddressesProps
 */
function Addresses(props: IAddressesProps): JSX.Element {
  const {
    locations,
    onAddAddressClickEvent,
    onSubmitAddressesClickEvent,
    onAddressChangeEvent,
  } = props;

  return (
    <IonContent>
      <IonLabel>Academy Locations</IonLabel>
      {/* Add New Location */}
      <IonButton slot='end' onClick={() => onAddAddressClickEvent()}>
        <IonIcon icon={addCircleOutline} />
      </IonButton>
      {/* Save Locations */}
      <IonButton slot='end' onClick={() => onSubmitAddressesClickEvent()}>
        <IonIcon icon={cloudDoneOutline} />
        <IonLabel> Save Locations </IonLabel>
      </IonButton>
      {/* Iterate though the locations */}
      {locations.map((location: IKeyValue, index: number) => (
        <Address
          key={index}
          location={location}
          onAddressChangeEvent={onAddressChangeEvent}
        />
      ))}
    </IonContent>
  );
}

export default Addresses;
