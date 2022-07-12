import { getAddressUserPk, IAddressUserMapping } from '@models/addressUserMapping-model';
import { IUserProfile } from '@models/view-models';
import addressRepo from '@repos/address-repo';
import addressUserMappingRepo from '@repos/addressUserMapping-repo';
import userRepo from '@repos/user-repo';
import { hashPrecision } from '@shared/constants/geohash-config';
import geoHash from 'ngeohash';

/**
 * Get gurus.
 * @param endeavour  
 * @param lat 
 * @param long 
 * @returns Gurus
 */
const searchGurus = async (endeavour: string, lat: string, long: string): Promise<IUserProfile[]> => {
    //TODO: Use geocode api here to fetch the address detail information to create the pk.
    let geoHashes: string[] = [];
    geoHashes.push(geoHash.encode(lat, long, hashPrecision));
    geoHashes = geoHashes.concat(geoHash.neighbors(geoHashes[0]));
    const hashKeys = geoHashes.map((hash, i, arr) => `AD-India-Maharashtra-Pune-${hash}`);
    return new Promise(async (resolve, error) => {
        const nearByAddresses = await addressRepo.getNearbyAddresses(hashKeys[0]);
        const addressUserMaps = await addressUserMappingRepo.getAddressMappedUserIds(
            nearByAddresses.map(
                (address, index, arr) => getAddressUserPk(address)));
        const users = await userRepo.getUsers(
            addressUserMaps.map((addressUserMap, i, arr) => addressUserMap.sk)
        );

        const gurus: IUserProfile[] = users.map((user, i, arr) => {
            const usrAddresses = addressUserMaps
                .filter((addrUsrMap, i, arr) => addrUsrMap.sk == user.sk)
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

export default {
    searchGurus
};

