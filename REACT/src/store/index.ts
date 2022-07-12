import { guruProfileReducer } from 'container/CoachProfile/coachProfile.reducer';
import { IAppState } from 'container/CoachProfile/coachProfile.types';
import { combineReducers } from 'redux';

export interface IApplicationState {
    App: IAppState
}

export const ApplicationReducers = combineReducers(
    {
        /** Reducer for the App container that is wrapped around the entire application. */
        App: guruProfileReducer,
    }
);