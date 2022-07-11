import { createHashHistory } from 'history';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { ApplicationReducers, IApplicationState } from 'store';
import sagas from './rootSagas';


// Initialize initial Redux state from the window object.
const initialReduxState = (window as any).initialReduxState as IApplicationState;


// Set up exports
export const history = createHashHistory();
export const store = configureStore(initialReduxState);


function configureStore(initialState: IApplicationState): Store<IApplicationState> {
    // create the composing function for our middleware
    const composeEnhancers = composeWithDevTools({});

    // create the redux-saga middleware
    const sagaMiddleware = createSagaMiddleware();

    // We'll create our store with the combined reducers/sagas, and the initial Redux state that
    // we'll be passing from our entry point.
    const createdStore = createStore(
        ApplicationReducers,
        initialState,
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );

    // Don't forget to run the root saga, and return the store object.
    sagaMiddleware.run(sagas);

    return createdStore;
}