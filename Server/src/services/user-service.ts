import userRepo from "@repos/user-repo";
import { IUser } from "@models/user-model";
import { UserNotFoundError } from "@shared/errors";
import { tableItemPrefexes } from "@shared/constants/table-item-prefix";

/**
 * Get all users.
 *
 * @returns
 */
async function get(email: string): Promise<IUser> {
  return await userRepo.getOne(email);
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
  const userId = getUserId(user);
  const existingUser = await userRepo.getOne(userId);
  if (existingUser) {
    return existingUser;
  }
  return await userRepo.save(user);
};

/**
 * Update one user.
 *
 * @param user
 * @returns
 */
async function updateOne(user: IUser): Promise<void> {
  const persists = await userRepo.persists(user.id);
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

function getUserId(user: IUser): string {
  if (user.phoneOtpVerified) {
    return user.id ?? tableItemPrefexes.VerifiedUserPrefix + user.email;
  } else {
    return user.id ?? tableItemPrefexes.UnVerifiedUserPrefix + user.email;
  }
}

// Export default
export default {
  get,
  getAll,
  addOne,
  updateOne,
  delete: deleteOne,
} as const;
