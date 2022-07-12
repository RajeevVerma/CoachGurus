
import { ActionCreator } from 'redux';
import { coachProfileActionConstants } from './coachProfile.constants';
import * as ActionTypes from './coachProfile.types';

export const getServiceDashboardWidget: ActionCreator<ActionTypes.IGetCoachProfileAction> = (pk: string) => ({
    payload: {
        pk
    },
    type: coachProfileActionConstants.Get_Coach_Profile,
});
