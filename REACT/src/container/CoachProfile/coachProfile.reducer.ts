// Import package modules
import { Reducer } from 'redux';
import { allGuruProfileActions, IAppState, initialAppState } from './coachProfile.types';
import { coachProfileActionConstants } from './coachProfile.constants';
import { initialState } from 'appReducer/App.reducer';

/** Union of action types */
export type AllActions = allGuruProfileActions;

export const guruProfileReducer: Reducer<IAppState> = (state: IAppState = initialAppState, action: any): IAppState => {

    // return state;
    let compositeReducer = guruProfileReducerSlice(state, action as allGuruProfileActions);

    return compositeReducer;
};

const guruProfileReducerSlice = (state: IAppState, action: allGuruProfileActions): IAppState => {
    switch (action.type) {
        case coachProfileActionConstants.Get_Guru_Profile: {
            return {
                ...state,
                message: null,
                guruProfile: null
            };
        }

        case coachProfileActionConstants.Set_Guru_Profile_On_Success: {
            console.log('state', state);
            console.log('action.payload.guruProfile', action.payload.guruProfile);

            return {
                ...state,
                message: null,
                guruProfile: action.payload.guruProfile
            };
        }

        case coachProfileActionConstants.Set_Guru_Profile_On_Error: {
            return {
                ...state,
                message: action.payload.message,
                guruProfile: null
            };
        }

        default: {
            return state || initialState;
        }
    }
}
