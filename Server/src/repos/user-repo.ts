import { getUserSk, IUser } from "@models/user-model";
import orm from "./mock-orm";
import AWS from "aws-sdk";
import { serviceConfigOptions } from "@shared/constants/aws-config";

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
                result = data as IUser;
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
 *
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
 *
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
}

/**
 * Get near by addresses  
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
}

// Export default
export default {
    getOne,
    persists,
    getAll,
    update,
    delete: deleteOne,
    save,
    getUsers
} as const;
