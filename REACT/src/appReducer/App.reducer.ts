import { initialAppState } from "container/CoachProfile/coachProfile.types";
import { Reducer } from "redux";
import { IApplicationState } from "store";

export const initialState: IApplicationState = {
    App: initialAppState
}


export const AppReducer: Reducer<IApplicationState> = (state: IApplicationState = initialState, action: any): IApplicationState => {

    return state;
}