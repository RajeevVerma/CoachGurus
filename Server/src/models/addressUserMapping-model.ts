import { tableItemPrefixes } from "@shared/constants/table-item-prefix";
import { IAddress } from "./shared/address";
import IdbItemBase from "./shared/dbItemBase";
import { IUser } from "./user-model";

// User schema
export interface IAddressUserMapping extends IdbItemBase {

}

export const getAddressUserPk = (address: IAddress): string => {
    return `${tableItemPrefixes.AddressUserMappingItemPrefix}${address.pk}-${address.sk}`;
}

export const getAddressUserSk = (userPk: string): string => {
    return `${userPk}`;
}