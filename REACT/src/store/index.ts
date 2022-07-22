import { guruProfileReducer } from 'container/CoachProfile/coachProfile.reducer';
import { IAppState } from 'container/CoachProfile/coachProfile.types';
import { guruListReducer } from 'container/GuruList/guruList.reducer';
import { IGuruListState } from 'container/GuruList/guruList.types';
import { combineReducers } from 'redux';

export interface IApplicationState {
    App: IAppState,
    GuruList: IGuruListState,
}

export const ApplicationReducers = combineReducers(
    {
        /** Reducer for the App container that is wrapped around the entire application. */
        App: guruProfileReducer,
        GuruList: guruListReducer
    }
);