import { TextField } from '@mui/material';
import { Fragment } from 'react';

/**
 * Represents props for the BasicInformation Component.
 */
interface IBasicInformationProps {
  firstName: string;
  lastName: string;
  onInputChangeEvent: (
    value: string,
    propertyName: 'lastName' | 'firstName'
  ) => void;
}

/** Represent BasicInformation Card Component.
 * props: IBasicInformationProps
 */
function BasicInformation(props: IBasicInformationProps): JSX.Element {
  const { onInputChangeEvent, firstName, lastName } = props;
  return (
    <Fragment>
      <label>What is your Name?*</label>
      <div>
        <TextField
          size='small'
          placeholder='First Name'
          id='first-name'
          variant='outlined'
          autoComplete='off'
          autoCorrect='off'
          type='text'
          value={firstName}
          onChange={(e) => onInputChangeEvent(e.target.value, 'firstName')}
        />
        <TextField
          size='small'
          placeholder='Last Name'
          id='last-name'
          variant='outlined'
          autoComplete='off'
          type='text'
          value={lastName}
          onChange={(e) => onInputChangeEvent(e.target.value, 'lastName')}
        />
      </div>
    </Fragment>
  );
}

export default BasicInformation;
