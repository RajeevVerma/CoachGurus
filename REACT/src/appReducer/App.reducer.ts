import { IAppState } from "./AppState.type";
import { Reducer } from 'redux';



export const initialState: IAppState = {
}


export const AppReducer: Reducer<IAppState> = (state: IAppState = initialState, action: any): IAppState => {

    return initialState;
}