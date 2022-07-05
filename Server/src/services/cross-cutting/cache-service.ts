import { IUser } from "@models/user-model";
import NodeCache from "node-cache";

const userAccessCache = new NodeCache({
  stdTTL: 3600 * 3,
  checkperiod: 120,
  deleteOnExpire: true,
});

export const getUserByAccessCode = (accessCode: string): IUser => {
  return userAccessCache.get(accessCode) as IUser;
};

export const setUserAccessData = (accessCode: string, user: IUser) => {
  userAccessCache.set(accessCode, user);
};
