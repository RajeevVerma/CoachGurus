import userRepo from "@repos/user-repo";
import { getGeneratedUserPk, getUserHashKey, getUserPk, getUserSk, IUser } from "@models/user-model";
import { UserNotFoundError } from "@shared/errors";
import addressService from "./address-service";
import { IUserProfile } from "@models/view-models";
import randomNumberTimeBased from './../shared/constants/randomGenerator.utility';

/**
 * Get user.
 * @param id 
 * @returns User
 */
async function get(phone: string): Promise<IUser> {
    const pk = getGeneratedUserPk(phone);
    return await userRepo.getOne(pk);
}

/**
 * Get all users.
 * @returns Users 
 */
async function getAll(): Promise<IUser[]> {
    return await userRepo.getAll();
}

/**
 * Add one user.
 *
 * @param user
 * @returns
 */
const addOne = async (user: IUser): Promise<IUser> => {
    const userId = getUserPk(user);

    console.log('user pk', userId);

    user.pk = userId;
    if (!user.bucketFolderName)
        user.bucketFolderName = randomNumberTimeBased(user.pk);

    const existingUser = await userRepo.getOne(userId);
    if (existingUser && existingUser.pk) {
        return existingUser;
    }
    user.sk = getUserSk(user.pk);

    return await userRepo.save(user);
};

/**
 * Update one user.
 *
 * @param user
 * @returns
 */
async function updateOne(user: IUser): Promise<void> {
    const persists = await userRepo.persists(user.pk);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return userRepo.update(user);
}

/**
 * Delete a user by their id.
 *
 * @param id
 * @returns
 */
async function deleteOne(id: string): Promise<void> {
    const persists = await userRepo.persists(id);
    if (!persists) {
        throw new UserNotFoundError();
    }
    return userRepo.delete(id);
}

/**
 * Update user profilec -- deprecated.
 * 
 * @param userProfile 
 * @returns 
 */
async function updateUserProfile(userProfile: IUserProfile): Promise<void> {

    console.log('adding user', userProfile);
    return new Promise(async (resolve, error) => {
        userProfile.user.addresses = userProfile.addresses;
        const user = await addOne(userProfile.user);
        userProfile.addresses.forEach(async (address, index, addrs) => {
            const saveAddress = await addressService.addAddress(address);
            await addressService.addAddressUserMapping(saveAddress, user.pk);
        });
        resolve(); // returning void.
    });
}

/**
 * Save profile pic.
 * @param phone 
 * @param profilePic 
 * @returns 
 */
async function saveProfilePic(phone: string, profilePic: string): Promise<void> {
    const userPk = getGeneratedUserPk(phone);

    return await userRepo.saveProfilePic(userPk, profilePic);
}

/**
 * Save cover pic.
 * @param phone 
 * @param coverPic 
 * @returns 
 */
async function saveCoverPic(phone: string, coverPic: string) {
    const userPk = getGeneratedUserPk(phone);

    return await userRepo.saveCoverPic(userPk, coverPic);
}

/**
 * Save activity pics.
 * @param phone 
 * @param activitypics - | separated string for multiple images 
 * @returns 
 */
async function saveActivityPics(phone: string, activitypics: string) {
    const userPk = getGeneratedUserPk(phone);

    return await userRepo.saveActivityPics(userPk, activitypics);
}

// Export default
export default {
    get,
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
    updateUserProfile,
    saveActivityPics,
    saveProfilePic,
    saveCoverPic
} as const;


