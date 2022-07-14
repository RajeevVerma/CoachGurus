// Import packages
import { Action } from 'redux';
import { coachProfileActionConstants } from './coachProfile.constants';
import { IUser } from 'models';

export interface IAppState {
    guruProfile: IUser | null,
    message: string | null,
}

export const initialAppState: IAppState = {
    guruProfile: null,
    message: null,
}

/**
* Interface representing the action for retrieving profile.
*/
export interface IGetCoachProfileAction extends Action {
    payload: {
        pk: string;
    };
    type: coachProfileActionConstants.Get_Guru_Profile;
}

export interface ISetCoachProfileOnSuccessAction extends Action {
    payload: {
        guruProfile: IUser;
    };
    type: coachProfileActionConstants.Set_Guru_Profile_On_Success;
}

export interface ISetCoachProfileOnErrorAction extends Action {
    payload: {
        message: string;
    };
    type: coachProfileActionConstants.Set_Guru_Profile_On_Error;
}

export type allGuruProfileActions = IGetCoachProfileAction | ISetCoachProfileOnSuccessAction | ISetCoachProfileOnErrorAction;