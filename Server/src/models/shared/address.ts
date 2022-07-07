import { tableItemPrefixes } from "@shared/constants/table-item-prefix"
import { uniqueIdGenerator } from "@shared/utils"
import { GeoPoint } from "dynamodb-geo/dist/types"
import IdbItemBase from "./dbItemBase"

//** Id is will be formatted as '{country}|{state}|{city}'   sorty-key - 'endeavourId'* /
export interface IAddress extends IdbItemBase {
    addr1: string,
    addr2?: string
    city: string,
    state: string,
    country: string,

    geoPont?: GeoPoint,

    //** Cannot be Null and can be initialized as empty string if no value present*/
    endeavourId: string
}

export const getAddressPk = (address: IAddress): string => {
    return address.pk ?? uniqueIdGenerator(`${tableItemPrefixes.AddressItemPrefix}${address.country}|${address.state}|${address.city}`);
}

export const getAddressSk = (address: IAddress): string => {
    return address.sk ?? `${address.endeavourId}`;
}
