import { IUser } from '@models/user-model';
import { getRandomInt } from '@shared/functions';
import orm from './mock-orm';
import AWS from 'aws-sdk';
import serviceConfigOptions from '@shared/constants/aws-config';

AWS.config.update(serviceConfigOptions);

const dbClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME: string = "Users";
// Bare-bones document client
//const ddbDocClient = DynamoDBDocumentClient.from(dbClient); // client is DynamoDB client

/**
 * Get one user.
 * 
 * @param email 
 * @returns 
 */
async function getOne(email: string): Promise<IUser | null> {
    var params = {
        TableName: TABLE_NAME,
        Key: {

        }
    };
    let result: IUser;
    // ddbDocClient. get(params, function (err, data) {
    //     //result = data;
    //     if (err) {
    //         console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    //     } else {
    //         console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    //     }
    // });


    const db = await orm.openDb();
    for (const user of db.users) {
        if (user.email === email) {
            return user;
        }
    }
    return null;
}


/**
 * See if a user with the given id exists.
 * 
 * @param id 
 */
async function persists(id: number): Promise<boolean> {
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
    const db = await orm.openDb();
    return db.users;
}

/**
 * Save a user.
 * 
 * @param user 
 * @returns 
 */
const save = async (user: IUser): Promise<any> => {
    console.log("user-repo", user);
    let result: any = {};

    // Call using bare-bones client and Command object.
    const puuter = await dbClient.put(
        {
            TableName: TABLE_NAME,
            Item: user,
        },
        async function (err, data) {
            if (err) {
                console.error(err);
            } else {
                console.log("PutItem succeeded:", data);
                const getter = await dbClient.get(
                    {
                        TableName: TABLE_NAME,
                        Key: {
                            "id": user.id
                        }
                    },
                    function (err, data) {
                        result = data;
                        if (err) {
                            console.error(err);
                        } else {
                            console.log("GetItem succeeded:", data);
                        }
                    }
                );
            }
        }
    );

    return result;
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
async function deleteOne(id: number): Promise<void> {
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
