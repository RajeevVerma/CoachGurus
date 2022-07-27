import { getBaseUrl, requestData } from 'data/data';
import { ApiUrls } from 'data/data.constants';
import { IUser } from 'models/user.interface';
import * as SagaEffects from 'redux-saga/effects';
import { setCoachProfileOnError, setCoachProfileOnSuccess } from './coachProfile.actions';
import { coachProfileActionConstants } from './coachProfile.constants';
import { IGetCoachProfileAction } from './coachProfile.types';

/**
 * Root saga for Coach profile page.
 */
export function* root(): Generator<SagaEffects.AllEffect<SagaEffects.ForkEffect<never>>, void, unknown> {
    try {
        yield SagaEffects.all([
            SagaEffects.takeEvery(coachProfileActionConstants.Get_Guru_Profile, getCoachProfile),

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
            undefined,
            transformResponseToUserModel
        );

        console.debug("Parsed user response", result);

        if (!result) {
            throw new Error('No results received.');
        }

        yield SagaEffects.put(setCoachProfileOnSuccess(result));
    } catch (ex) {
        console.error('Error in coach profile API: ', ex);
        yield SagaEffects.put(setCoachProfileOnError('There was an error while loading coach profile!'));

    }
}

const transformResponseToUserModel = (transformResponseToUserModel: any): IUser => transformResponseToUserModel as IUser;
