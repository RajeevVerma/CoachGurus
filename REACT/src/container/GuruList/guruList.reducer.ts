// Import package modules
import { Reducer } from 'redux';
import { allGuruListActions, IGuruListState, initialGuruListState } from './guruList.types';
import { guruListActionConstants } from './guruList.constants';
import { initialState } from 'appReducer/App.reducer';

/** Union of action types */
export type AllActions = allGuruListActions;

export const guruListReducer: Reducer<IGuruListState> = (state: IGuruListState = initialGuruListState, action: any): IGuruListState => {

    // return state;
    let compositeReducer = guruListReducerSlice(state, action as allGuruListActions);

    return compositeReducer;
};

const guruListReducerSlice = (state: IGuruListState, action: allGuruListActions): IGuruListState => {
    switch (action.type) {
        case guruListActionConstants.Get_Guru_List: {
            return {
                ...state,
                gurus: []
            };
        }

        case guruListActionConstants.Set_Guru_List_On_Success: {
            console.log('state', state);
            console.log('action.payload.gurus', action.payload.gurus);

            return {
                ...state,
                gurus: action.payload.gurus
            };
        }

        case guruListActionConstants.Set_Guru_List_On_Error: {
            return {
                ...state,
                gurus: [],
            };
        }

        default: {
            return state || initialState;
        }
    }
}
