import userRepo from "@repos/user-repo";
import { 
    getUserPk, 
    getUserSk, 
    IUser,
    IUserProfile } from "@models/index";
import { UserNotFoundError } from "@shared/errors";
import addressService from "./address-service";

/**
 * Get user.
 * @param id 
 * @returns User
 */
async function get(id: string): Promise<IUser> { 
    return await userRepo.getOne(id);
}

/**
 * Get all users.
 *
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
    const existingUser = await userRepo.getOne(userId);
    if (existingUser) {
        return existingUser;
    }
    user.sk = getUserSk(user);

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
 * Update user profile
 * 
 * @param userProfile 
 * @returns 
 */
async function updateUserProfile(userProfile: IUserProfile): Promise<void>  {
    // udpate / add the user 
    console.log('adding user');
    const user = await addOne(userProfile.user);
    userProfile.addresses.forEach(async (address, index, addrs) => {
        const saveAddress = await addressService.addAddress(address);
        await addressService.addAddressUserMapping(saveAddress, user.pk);
    });

    return;
}

// Export default
export default {
    get,
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
    updateUserProfile,
} as const;


