import userRepo from "@repos/user-repo";
import { getGeneratedUserPk, getUserPk, getUserSk, IUser } from "@models/user-model";
import { UserNotFoundError } from "@shared/errors";

/**
 * Get all users.
 *
 * @returns
 */
async function get(phone: string): Promise<IUser> {
    const pk = getGeneratedUserPk(phone);
    return await userRepo.getOne(pk);
}

/**
 * Get all users.
 *
 * @returns
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

// Export default
export default {
    get,
    getAll,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;


