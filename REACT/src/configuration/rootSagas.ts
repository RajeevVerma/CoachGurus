// Import packages
import * as SagaEffects from 'redux-saga/effects';

// Import project items
//import * as AppSaga from '../containers/App/App.sagas';
/* Insert new saga imports above - DO NOT REMOVE */

// Start up root sagas for each container
export default function* root(): Generator<SagaEffects.AllEffect<SagaEffects.ForkEffect<void>>, void, unknown> {
    // Start up all sagas
    yield SagaEffects.all([
        // SagaEffects.fork(AppSaga.root),
        /* Insert new saga root above - DO NOT REMOVE */
    ]);
}
