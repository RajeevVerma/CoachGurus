// Import packages
import { Action } from 'redux';
import { guruListActionConstants } from './guruList.constants';
import { IUser } from 'models';
import { coachProfileActionConstants } from 'container/CoachProfile/coachProfile.constants';

export interface IGuruListState {
    gurus: IUser[],
}

export const initialGuruListState: IGuruListState = {
    gurus: []
}

/**
* Interface representing the action for retrieving guru list.
*/
export interface IGetGuruListAction extends Action {
    payload: {
        lat: string,
        long: string,
        endeavourId: string
    };
    type: guruListActionConstants.Get_Guru_List;
}

export interface ISetGuruListOnSuccessAction extends Action {
    payload: {
        gurus: IUser[];
    };
    type: guruListActionConstants.Set_Guru_List_On_Success;
}

export interface ISetGuruListOnErrorAction extends Action {
    payload: {
        message: string;
    };
    type: guruListActionConstants.Set_Guru_List_On_Error;
}

export type allGuruListActions = IGetGuruListAction | ISetGuruListOnErrorAction | ISetGuruListOnSuccessAction;