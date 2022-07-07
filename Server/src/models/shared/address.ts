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
    lat: string,
    long: string,
    //** Cannot be Null and can be initialized as empty string if no value present*/
    endeavourId: string
}

export const getAddressPk = (address: IAddress, geoHash: string): string => {
    return address.pk ?? `${tableItemPrefixes.AddressItemPrefix}${tableItemPrefixes.AddressItemPrefix}${address.country}|${address.state}|${address.city}|${geoHash}`;
}

export const getAddressSk = (address: IAddress): string => {
    return address.sk ?? uniqueIdGenerator(tableItemPrefixes.AddressItemPrefix);
}
