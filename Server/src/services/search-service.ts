import { getAddressUserPk, IAddressUserMapping } from '@models/addressUserMapping-model';
import { IAddress } from '@models/shared';
import { IUser } from '@models/user-model';
import { IUserProfile } from '@models/view-models';
import addressRepo from '@repos/address-repo';
import addressUserMappingRepo from '@repos/addressUserMapping-repo';
import userRepo from '@repos/user-repo';
import { hashPrecision } from '@shared/constants/geohash-config';
import { InUseResourceCount } from 'aws-sdk/clients/lightsail';
import geoHash from 'ngeohash';

/**
 * Get gurus.
 * @param endeavour  
 * @param lat 
 * @param long 
 * @returns Gurus
 */
const searchGurus = async (endeavour: string, lat: string, long: string): Promise<IUserProfile[]> => {


    return new Promise(async (resolve, error) => {
        const nearByAddresses = await findNearByAddresses(lat, long);
        const addressUserMappings = await getAddressUserMappings(nearByAddresses);
        const users = await getUsersByAddresses(addressUserMappings);
        const gurus: IUserProfile[] = users.map((user, i, arr) => {
            const usrAddresses = addressUserMappings
                .filter((addrUsrMap, i, arr) => addrUsrMap.sk == user.pk)
                .map((addrUsrMap, i, arr) => addrUsrMap.pk);
            const addresses = nearByAddresses.filter((addr, i, arr) => usrAddresses.includes(getAddressUserPk(addr)));

            return {
                user: user,
                addresses: addresses
            };
        });

        resolve(gurus);
    });
};

/**
 * Find near by addresses.
 * @param lat 
 * @param long 
 * @returns Addresses
 */
const findNearByAddresses = async (lat: string, long: string): Promise<IAddress[]> => {
    //TODO: Use geocode api here to fetch the address detail information to create the pk.
    let geoHashes: string[] = [];
    geoHashes.push(geoHash.encode(lat, long, hashPrecision));
    geoHashes = geoHashes.concat(geoHash.neighbors(geoHashes[0]));
    const partitionKeys = geoHashes.map((hash, i, arr) => `AD-India-Maharashtra-Pune-${hash}`);
    let addresses: IAddress[] = [];
    for (let i = 0; i < partitionKeys.length; i++) {
        console.log('fetching address');
        const addrs = await addressRepo.get(partitionKeys[i]);
        console.log('address fetched', addrs);
        addresses = addresses.concat(addrs);
    }

    return new Promise((resolve, error) => {
        resolve(addresses);
    });
};

/**
 * Find address user mappings.
 * @param addresses 
 * @returns 
 */
const getAddressUserMappings = async (addresses: IAddress[]): Promise<IAddressUserMapping[]> => {
    let addressUserMappings: IAddressUserMapping[] = [];
    return new Promise(async (resolve, error) => {
        for (let i = 0; i < addresses.length; i++) {
            const addrUserMappings = await addressUserMappingRepo.getAddressUserMappings(getAddressUserPk(addresses[i]));
            addressUserMappings = addressUserMappings.concat(addrUserMappings);
        }
        resolve(addressUserMappings);
    });
};

/**
 * Find address user mappings.
 * @param addresses 
 * @returns 
 */
const getUsersByAddresses = (addressUserMappings: IAddressUserMapping[]): Promise<IUser[]> => {
    let users: IUser[] = [];
    return new Promise(async (resolve, error) => {
        for (let i = 0; i < addressUserMappings.length; i++) {
            const user = await userRepo.getOne(addressUserMappings[i].sk);
            users.push(user);
        }
        resolve(users);
    });
};

export default {
    searchGurus
};

