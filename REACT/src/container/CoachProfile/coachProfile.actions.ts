
import { IUser } from 'models';
import { ActionCreator } from 'redux';
import { coachProfileActionConstants } from './coachProfile.constants';
import * as ActionTypes from './coachProfile.types';

export const getCoachProfile: ActionCreator<ActionTypes.IGetCoachProfileAction> = (pk: string) => ({
    payload: {
        pk
    },
    type: coachProfileActionConstants.Get_Guru_Profile,
});

export const setCoachProfileOnSuccess: ActionCreator<ActionTypes.ISetCoachProfileOnSuccessAction> = (coachProfile: IUser) => ({
    payload: {
        guruProfile: coachProfile
    },
    type: coachProfileActionConstants.Set_Guru_Profile_On_Success,
});

export const setCoachProfileOnError: ActionCreator<ActionTypes.ISetCoachProfileOnErrorAction> = (message: string) => ({
    payload: {
        message: message
    },
    type: coachProfileActionConstants.Set_Guru_Profile_On_Error,
});
