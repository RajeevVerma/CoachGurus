import { AppReducer } from 'appReducer/App.reducer';
import { combineReducers } from 'redux';

export interface IApplicationState {

}

export const ApplicationReducers = combineReducers(
    {
        /** Reducer for the App container that is wrapped around the entire application. */
        App: AppReducer,
    },
);