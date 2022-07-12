// Import packages
import { Action } from 'redux';
import { coachProfileActionConstants } from './coachProfile.constants';

/**
* Interface representing the action for retrieving profile.
*/
export interface IGetCoachProfileAction extends Action {
    payload: {
        pk: string;
    };
    type: coachProfileActionConstants.Get_Coach_Profile;
}