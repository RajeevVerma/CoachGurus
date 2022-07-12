
import geoHash from 'ngeohash';

import { hashPrecision } from "@shared/constants/geohash-config";
import addressRepo from '@repos/address-repo';
import addressUserMappingRepo from '@repos/addressUserMapping-repo';
import { 
    IAddress, 
    getAddressPk, 
    getAddressSk,
    IAddressUserMapping,
    getAddressUserPk,
    getAddressUserSk
 } from '@models/index';

const addAddress = async (address: IAddress): Promise<IAddress> => {
    //TODO: Check for existence and alter the flow.
        console.log('adding address');
        address.pk = getAddressPk(address, geoHash.encode(address.lat, address.long, hashPrecision));
        address.sk = getAddressSk(address);
        console.log(address);
        return await addressRepo.save(address);
}

const addAddressUserMapping = async (address: IAddress, userPk: string): Promise<IAddressUserMapping> => {
    const addressUserMapping: IAddressUserMapping = {
            pk: getAddressUserPk(address),
            sk: getAddressUserSk(userPk)
        };
        console.log('adding address user mapping.');
        console.log(addressUserMapping);
        return await addressUserMappingRepo.save(addressUserMapping);
}

export default {
    addAddress,
    addAddressUserMapping
} as const;