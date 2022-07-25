import { IonButton, IonIcon, IonItem, IonLabel, IonText } from '@ionic/react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { IKeyValue } from 'models';
import { IAddress } from 'models/address.model';
import { fetchAddressFromLocation } from 'utilities/google.utility';
import { Fragment } from 'react';
import { cloudDoneOutline, removeCircleOutline } from 'ionicons/icons';

/**
 * Represents props for the Address Component.
 */
interface IAddressProps {
  location: IKeyValue;
  onAddressChangeEvent: (address: IAddress) => void;
  onRemoveAddressEvent: (location: IKeyValue) => void;
}

/** Represent Address Card Component.
 * props: IAddressProps
 */
function Address(props: IAddressProps): JSX.Element {
  const { location, onRemoveAddressEvent, onAddressChangeEvent } = props;

  const locationStyle = (provided: any) => ({
    ...provided,
    color: '#232e4d',
  });

  const handleGoogleLocationChange = (value: any) => {
    fetchAddressFromLocation(value);
  };

  return (
    <Fragment>
      <IonItem>
        <IonLabel>Academy {location.key}</IonLabel>
        {/* Save Locations */}
        <IonButton slot='end' onClick={() => onRemoveAddressEvent(location)}>
          <IonIcon icon={removeCircleOutline} />
          <IonLabel>DELETE Location</IonLabel>
        </IonButton>
      </IonItem>
      <IonItem>
        <IonText placeholder='Landmark' id='location-one-name' />
      </IonItem>
      <IonItem>
        <GooglePlacesAutocomplete
          apiKey={'AIzaSyCZ2tJfShJZfqBzIRXHpPYW1cmZ5A8ODKo'}
          selectProps={{
            value: location.value,
            onChange: (e: any) => handleGoogleLocationChange(e),
            styles: {
              input: locationStyle,
              option: locationStyle,
              singleValue: locationStyle,
            },
          }}
          autocompletionRequest={{
            componentRestrictions: {
              country: ['in'],
            },
            types: ['Address'],
          }}
        />
      </IonItem>
    </Fragment>
  );
}

export default Address;
