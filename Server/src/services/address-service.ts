
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
    getAddressUserSk,
    getAddressUserPkByAddressKey,
    getGeneratedUserPk
} from '@models/index';
import userService from './user-service';
import userRepo from '@repos/user-repo';

const addAddress = async (address: IAddress): Promise<IAddress> => {
    address.pk = getAddressPk(address, geoHash.encode(address.lat, address.long, hashPrecision));
    address.sk = getAddressSk(address);

    return await addressRepo.save(address);
}

const updateAddress = async (address: IAddress): Promise<IAddress> => {

    return await addressRepo.save(address);
}

const addAddressUserMapping = async (address: IAddress, phone: string): Promise<IAddressUserMapping> => {
    const userPk = getGeneratedUserPk(phone);
    const addressUserMapping: IAddressUserMapping = {
        pk: getAddressUserPk(address),
        sk: getAddressUserSk(userPk)
    };

    return await addressUserMappingRepo.save(addressUserMapping);
}

const getUserAddresses = async (phone: string): Promise<IAddress[]> => {
    const userPk = getGeneratedUserPk(phone);
    const mappings = await addressUserMappingRepo.getAddressUserMappings(userPk);
    const addressPks = mappings.map(x => x.pk);

    return await addressRepo.getAddresses(addressPks);
}

/**
 * Add/Update address for the user
 * 
 * @param userProfile 
 * @returns 
 */
async function addOrUpdateAddressForUser(phone: string, address: IAddress): Promise<IAddress | undefined> {
    const userPk = getGeneratedUserPk(phone);
    try {
        // if sk and pk both exist in the address then we have to update the exsiting address instead adding a new one
        if (address.pk && address.sk) {
            const user = await userService.get(phone);
            let userAddresses = user.addresses;
            const addressIndex = userAddresses.findIndex((userAddress, i, arr) =>
                (userAddress.pk == address.pk && userAddress.sk == address.sk)
            );

            return await addressRepo.updateUserAddress(address, userPk, addressIndex);
        } else {
            address.pk = getAddressPk(address, geoHash.encode(address.lat, address.long, hashPrecision));
            address.sk = getAddressSk(address);
            const addressUserMapping: IAddressUserMapping = {
                pk: getAddressUserPk(address),
                sk: getAddressUserSk(userPk)
            };

            return await addressRepo.addUserAddress(address, addressUserMapping, userPk);
        }
    } catch (err) {
        throw err;
    }
}

const deleteUserAddress = async (addressPk: string, addressSk: string, phone: string): Promise<void> => {
    const userPk = getGeneratedUserPk(phone);
    const user = await userService.get(phone);
    let userAddresses = user.addresses;
    const addressIndex = userAddresses.findIndex((userAddress, i, arr) =>
        (userAddress.pk == addressPk && userAddress.sk == addressSk)
    );
    return await addressRepo
        .deleteUserAddress(
            addressPk,
            addressSk,
            getAddressUserPkByAddressKey({
                sk: addressPk,
                pk: addressSk
            }),
            getAddressUserSk(userPk),
            userPk,
            addressIndex
        );
}

export default {
    addAddress,
    addAddressUserMapping,
    getUserAddresses,
    updateAddress,
    addOrUpdateAddressForUser,
    deleteUserAddress
} as const;