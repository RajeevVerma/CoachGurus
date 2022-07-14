import { IUser, IAddress } from '@models/index';


export interface IUserProfile {
    user: IUser,
    addresses: IAddress[]
}