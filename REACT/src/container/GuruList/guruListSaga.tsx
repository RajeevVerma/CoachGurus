import { getBaseUrl, requestData } from 'data/data';
import { ApiUrls } from 'data/data.constants';
import { IUser } from 'models/user.interface';
import * as SagaEffects from 'redux-saga/effects';
import { setGuruListOnError, setGuruListOnSuccess } from './guruList.actions';
import { guruListActionConstants } from './guruList.constants';
import { IGetGuruListAction } from './guruList.types';

/**
 * Root saga for Guru List page.
 */
export function* root(): Generator<SagaEffects.AllEffect<SagaEffects.ForkEffect<never>>, void, unknown> {
    try {
        yield SagaEffects.all([
            SagaEffects.takeEvery(guruListActionConstants.Get_Guru_List, getGuruList),

        ]);
    } catch (ex) {
        console.debug('Error in loading root saga: ', ex);
    }
}


function* getGuruList(guruListAction: IGetGuruListAction) {
    try {
        console.log('Guru List Saga.');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const result: IUser[] = yield requestData(
            `${getBaseUrl()}${ApiUrls.Get_Url_Root}${ApiUrls.Get_Guru_List_Url}${guruListAction.payload.endeavourId}/${guruListAction.payload.lat}/${guruListAction.payload.long}`,
            undefined,
            transformResponseToUserModel
        );

        console.debug("Parsed user response", result);

        if (!result) {
            throw new Error('No results received.');
        }

        yield SagaEffects.put(setGuruListOnSuccess(result));
    } catch (ex) {
        console.error('Error in coach profile API: ', ex);
        yield SagaEffects.put(setGuruListOnError('There was an error while loading guru list!'));

    }
}

const transformResponseToUserModel = (transformResponseToUserModel: any): IUser[] => transformResponseToUserModel as IUser[];
