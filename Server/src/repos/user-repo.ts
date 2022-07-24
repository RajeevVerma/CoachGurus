import { getUserSk, IUser } from "@models/user-model";
import orm from "./mock-orm";
import AWS from "aws-sdk";
import { serviceConfigOptions } from "@shared/constants/aws-config";
import { IAddress } from "@models/shared";

console.log(serviceConfigOptions);
AWS.config.update(serviceConfigOptions);

const dbClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME: string = "coach-gurus-entities";

/**
 * Get one user.
 * @param id
 * @returns
 */
async function getOne(pk: string): Promise<IUser> {
    console.log('Users getOne pk', pk);

    let result: IUser | undefined;
    return new Promise((resolve, error) => {
        dbClient.get(
            {
                TableName: TABLE_NAME,
                Key: {
                    pk: pk,
                    sk: getUserSk(pk)
                },
            }, function (err, data) {
                result = data.Item as IUser;
                if (err) {
                    console.error(err);
                    error(err);
                } else {
                    console.log("GetItem succeeded:", data);
                    resolve(result);
                }
            });
    });
}

/**
 * See if a user with the given id exists.
 * @param id
 */
async function persists(id: string): Promise<boolean> {
    const db = await orm.openDb();
    for (const user of db.users) {
        if (user.pk === id) {
            return true;
        }
    }
    return false;
}

/**
 * Get all users.
 * @returns
 */
async function getAll(): Promise<IUser[]> {
    let result: IUser[] = [];

    return new Promise((resolve, error) => {
        dbClient.scan(
            {
                TableName: TABLE_NAME,
            },
            function (err, data) {
                result = data as IUser[];
                if (err) {
                    console.error(err);
                    error(err);
                } else {
                    console.log("getAll succeeded:", data);
                    resolve(result);
                }
            }
        );
    });
}

/**
 * Save a user.
 * @param user
 * @returns
 */
const save = async (user: IUser): Promise<any> => {
    console.log("user-repo", user);
    let result: IUser | null = null;

    return new Promise((resolve, error) => {
        dbClient.put(
            {
                TableName: TABLE_NAME,
                Item: user,
            },
            async function (err, data) {
                if (err) {
                    console.error(err);
                    error(err);
                } else {
                    console.debug("PutItem succeeded:", data);
                    resolve(user);
                }
            }
        );

        return result;
    });
};

/**
 * Update a user.
 * @param user
 * @returns
 */
async function update(user: IUser): Promise<void> {
    const db = await orm.openDb();
    for (let i = 0; i < db.users.length; i++) {
        if (db.users[i].pk === user.pk) {
            db.users[i] = user;
            return orm.saveDb(db);
        }
    }
}

/**
 * Delete one user.
 * @param id
 * @returns
 */
async function deleteOne(id: string): Promise<void> {
    const db = await orm.openDb();
    for (let i = 0; i < db.users.length; i++) {
        if (db.users[i].id === id) {
            db.users.splice(i, 1);
            return orm.saveDb(db);
        }
    }
};

/**
 * Get users by userids
 * @param userIds 
 * @returns 
 */
const getUsers = (userIds: string[]): Promise<IUser[]> => {
    let keyConditionExpression: string = '';
    let expressionAttributeValue: any = {};
    userIds.forEach((key, index, partitionKeys) => {
        if (index > 0) {
            keyConditionExpression += ' OR ';
        }
        const attribute = `:pk-${index}`;
        keyConditionExpression += `PK=${attribute}`;
        expressionAttributeValue.push({ attribute: { "S": key } });
    });
    //TODO: Add filter for the endeavour id (Think of creating a secondary index).
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValue,
    };

    return new Promise((resolve, error) => {
        dbClient.query(params,
            (err, data) => {
                if (err) {
                    error(err);
                } else {
                    const users = data.Items as IUser[];
                    resolve(users);
                }
            }
        );
    });
};

/**
 * add user address.
 * @param userPk 
 * @param address 
 * @returns 
 */
const addUserAddress = async (userPk: string, address: IAddress): Promise<void> => {
    console.log("add user address - user-repo", userPk);
    const param = {
        TableName: TABLE_NAME,
        Key: { "pk": userPk, "sk": userPk },
        UpdateExpression: "SET #addresses = list_append(#addresses, :address)",
        ExpressionAttributeNames: {
            "#addresses": "addresses",
        },
        ExpressionAttributeValues: {
            ":address": [address]
        }
    };

    return new Promise((resolve, error) => {
        dbClient.update(param, function (err, data) {
            if (err) {
                console.error(err);
                error(err);
            } else {
                console.debug("Update item succeeded:", data);
                resolve();
            }
        }
        );
    });
};

/**
 * Update user addresses.
 * @param userPk 
 * @param addresses 
 * @returns 
 */
const updateUserAddresses = async (userPk: string, addresses: IAddress[]): Promise<void> => {
    console.log("update user address - user-repo", addresses);
    const param = {
        TableName: TABLE_NAME,
        Key: { "pk": userPk, "sk": userPk },
        UpdateExpression: "SET #addresses = :addresses",
        ExpressionAttributeNames: {
            "#addresses": "addresses",
        },
        ExpressionAttributeValues: {
            ":address": addresses
        }
    };

    return new Promise((resolve, error) => {
        dbClient.update(param, function (err, data) {
            if (err) {
                console.error(err);
                error(err);
            } else {
                console.debug("Update item succeeded:", data);
                resolve();
            }
        }
        );
    });
};

/**
 * Get users by pks 
 * @param userPks 
 * @param endeavourId 
 * @returns 
 */
const getUserByPks = async (userPks: string[], endeavourId: string): Promise<IUser[]> => {
    const keys = userPks.map((pk, i, arr) => ({ "pk": pk, "sk": pk }));

    return new Promise((resolve, error) => {
        dbClient.batchGet({
            RequestItems: {
                "coach-gurus-entities": {
                    Keys: keys
                }
            }
        }, (err, data) => {
            if (err) {
                console.log(err);
                error(err);
            } else {
                console.log(data);
                console.log(data.Responses);
                if (data.Responses) {
                    let users = data.Responses['coach-gurus-entities'] as IUser[];
                    users = users.filter((user, i, arr) => user.coachingEndeavourPks.includes(endeavourId));
                    resolve(users);
                } else {
                    resolve([]);
                }
            }
        })
    });
}

/**
 * Save profile pic for the user
 * @param userPk 
 * @param profilePic 
 * @returns 
 */
const saveProfilePic = async (userPk: string, profilePic: string): Promise<void> => {
    console.log('user-repo: saveProfilePicUrl');
    const param = {
        Key: {
            'sk': userPk,
            'pk': userPk
        },
        TableName: TABLE_NAME,
        UpdateExpression: 'SET #profilePicUrl=:picUrl',
        ExpressionAttributeNames: {
            '#profilePicUrl': 'profilePicUrl'
        },
        ExpressionAttributeValues: {
            ':picUrl': profilePic
        }
    };

    return new Promise((resolve, error) => {
        dbClient.update(param, (err, data) => {
            if (err) {
                console.log('Error in user-repo: saveProfilePicUrl', err);
                error(err);
            }
            console.log(data);
            resolve();
        });
    })
}

/**
 * Save cover pic for the user
 * @param userPk 
 * @param coverPic 
 * @returns 
 */
const saveCoverPic = async (userPk: string, coverPic: string): Promise<void> => {
    console.log('user-repo: saveCoverPicUrl');
    const param = {
        Key: {
            'sk': userPk,
            'pk': userPk
        },
        TableName: TABLE_NAME,
        UpdateExpression: 'SET #coverPicUrl=:picUrl',
        ExpressionAttributeNames: {
            '#coverPicUrl': 'coverPicUrl'
        },
        ExpressionAttributeValues: {
            ':picUrl': coverPic
        }
    };

    return new Promise((resolve, error) => {
        dbClient.update(param, (err, data) => {
            if (err) {
                console.log('Error in user-repo: saveCoverPicUrl', err);
                error(err);
            }
            console.log(data);
            resolve();
        });
    })
}

/**
 * Save activity pics for the user
 * @param userPk 
 * @param activityPics 
 * @returns 
 */
const saveActivityPics = async (userPk: string, activityPics: string): Promise<void> => {
    console.log('user-repo: saveActivityPics');
    const param = {
        Key: {
            'sk': userPk,
            'pk': userPk
        },
        TableName: TABLE_NAME,
        UpdateExpression: 'SET #profileData.#coachingPhotos=:activityUrls',
        ExpressionAttributeNames: {
            '#profileData': 'profileData',
            '#coachingPhotos': 'coachingPhotos'
        },
        ExpressionAttributeValues: {
            ':activityUrls': activityPics
        }
    };

    return new Promise((resolve, error) => {
        dbClient.update(param, (err, data) => {
            if (err) {
                console.log('Error in user-repo: saveCoverPicUrl', err);
                error(err);
            }
            console.log(data);
            resolve();
        });
    })
}

// Export default
export default {
    getOne,
    persists,
    getAll,
    update,
    delete: deleteOne,
    save,
    getUsers,
    addUserAddress,
    updateUserAddresses,
    getUserByPks,
    saveProfilePic,
    saveCoverPic,
    saveActivityPics
} as const;
