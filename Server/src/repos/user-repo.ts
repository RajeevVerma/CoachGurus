import { IUser } from '@models/user-model';
import orm from './mock-orm';
import AWS from 'aws-sdk';
import serviceConfigOptions from '@shared/constants/aws-config';

AWS.config.update(serviceConfigOptions);

const dbClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME: string = 'Users';

/**
 * Get one user.
 * 
 * @param email 
 * @returns 
 */
async function getOne(email: string): Promise<IUser> {
    var params = {
        ExpressionAttributeValues: {
            ":e": email
        },
        KeyConditionExpression: 'email= :e',

        TableName: TABLE_NAME,
    };

    let result: IUser | undefined;
    return new Promise((resolve, error) => {
        dbClient.query(
            params,
            function (err, data) {
                if (err) {
                    console.error(err);
                    error(err);
                } else {
                    result = data.Items?.[0] as IUser;
                    console.log('GetItem succeeded:', result);
                    resolve(result);
                }
            }
        );
    });
}


/**
 * See if a user with the given id exists.
 * 
 * @param id 
 */
async function persists(id: string): Promise<boolean> {
    const db = await orm.openDb();
    for (const user of db.users) {
        if (user.id === id) {
            return true;
        }
    }
    return false;
}


/**
 * Get all users.
 * 
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
                    console.log('getAll succeeded:', data);
                    resolve(result);
                }
            }
        );
    });
}

/**
 * Save a user.
 * 
 * @param user 
 * @returns 
 */
const save = async (user: IUser): Promise<any> => {
    console.log('user-repo', user);
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
                } else {
                    console.log('PutItem succeeded:', data);

                    await dbClient.get(
                        {
                            TableName: TABLE_NAME,
                            Key: {
                                'email': user.email
                            }
                        },
                        function (err, data) {
                            result = data as IUser;
                            if (err) {
                                console.error(err);
                                error(err);
                            } else {
                                console.log('GetItem succeeded:', data);
                                resolve(result);
                            }
                        }
                    );
                }
            }
        );

        return result;
    })
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
        if (db.users[i].id === user.id) {
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


// Export default
export default {
    getOne,
    persists,
    getAll,
    update,
    delete: deleteOne,
    save,
} as const;
