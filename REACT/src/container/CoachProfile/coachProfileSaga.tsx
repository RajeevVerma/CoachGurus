
import { getBaseUrl, requestData } from 'data/data';
import { ApiUrls } from 'data/data.constants';
import { IUser } from 'models/user.interface';
import * as SagaEffects from 'redux-saga/effects';
import { coachProfileActionConstants } from './coachProfile.constants';
import { IGetCoachProfileAction } from './coachProfile.types';


/**
 * Root saga for Coach profile page.
 */
export function* root(): Generator<SagaEffects.AllEffect<SagaEffects.ForkEffect<never>>, void, unknown> {
    try {
        yield SagaEffects.all([
            SagaEffects.takeEvery(coachProfileActionConstants.Get_Coach_Profile, getCoachProfile),

        ]);
    } catch (ex) {
        console.debug('Error in loading root saga: ', ex);
    }
}


function* getCoachProfile(profileAction: IGetCoachProfileAction) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: IUser = yield requestData(
            `${getBaseUrl()}${ApiUrls.Get_Url_Root}${ApiUrls.Get_Coach_Url}${profileAction.payload.pk}`,
        );

        if (!result) {
            throw new Error('No results received.');
        }

        //  yield SagaEffects.put(Actions.getCoachProfileSuccess(result));
    } catch (ex) {
        console.debug('Error in coach profile API: ', ex);

    }
}