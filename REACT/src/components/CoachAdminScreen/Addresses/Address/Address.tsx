import { IonButton, IonIcon, IonLabel } from '@ionic/react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { IKeyValue } from 'models';
import { IAddress } from 'models/address.model';
import { fetchAddressFromLocation } from 'utilities/google.utility';
import { Fragment } from 'react';
import { removeCircleOutline } from 'ionicons/icons';
import { TextField } from '@mui/material';

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
      <div>
        <IonLabel>Academy {location.key}</IonLabel>
        {/* Save Locations */}
        <IonButton slot='end' onClick={() => onRemoveAddressEvent(location)}>
          <IonIcon icon={removeCircleOutline} />
          <IonLabel>DELETE Location</IonLabel>
        </IonButton>
      </div>
      <div>
        <TextField
          placeholder='Landmark'
          id='location-one-name'
          autoComplete='off'
          type='text'
        />
      </div>
      <div>
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
      </div>
    </Fragment>
  );
}

export default Address;
