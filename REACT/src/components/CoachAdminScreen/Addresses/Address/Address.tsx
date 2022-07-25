import { IonContent, IonItem, IonLabel, IonText } from '@ionic/react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { IKeyValue } from 'models';
import { IAddress } from 'models/address.model';
import { fetchAddressFromLocation } from 'utilities/google.utility';

/**
 * Represents props for the Address Component.
 */
interface IAddressProps {
  location: IKeyValue;
  onAddressChangeEvent: (address: IAddress) => void;
}

/** Represent Address Card Component.
 * props: IAddressProps
 */
function Address(props: IAddressProps): JSX.Element {
  const { location } = props;

  const locationStyle = (provided: any) => ({
    ...provided,
    color: '#232e4d',
  });

  const handleGoogleLocationChange = (value: any) => {
    fetchAddressFromLocation(value);
  };

  return (
    <IonContent>
      <IonItem>
        <IonLabel>Academy {location.key}</IonLabel>
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
    </IonContent>
  );
}

export default Address;
