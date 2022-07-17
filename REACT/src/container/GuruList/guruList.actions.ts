
import { IUser } from 'models';
import { ActionCreator } from 'redux';
import { guruListActionConstants } from './guruList.constants';
import * as ActionTypes from './guruList.types';

export const getGuruList: ActionCreator<ActionTypes.IGetGuruListAction> = (lat: string, long: string, endeavourId: string) => ({
    payload: {
        lat,
        long,
        endeavourId
    },
    type: guruListActionConstants.Get_Guru_List,
});

export const setGuruListOnSuccess: ActionCreator<ActionTypes.ISetGuruListOnSuccessAction> = (gurus: IUser[]) => ({
    payload: {
        gurus: gurus
    },
    type: guruListActionConstants.Set_Guru_List_On_Success,
});

export const setGuruListOnError: ActionCreator<ActionTypes.ISetGuruListOnErrorAction> = (message: string) => ({
    payload: {
        message: message
    },
    type: guruListActionConstants.Set_Guru_List_On_Error,
});
