import AWS from 'aws-sdk';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { IAddress, IAddressUserMapping } from '../models';
import { serviceConfigOptions } from "@shared/constants/aws-config";
import { BatchGetItemInput } from '@aws-sdk/client-dynamodb';

console.log(serviceConfigOptions);
AWS.config.update(serviceConfigOptions);

const dbClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME: string = "coach-gurus-entities";

/**
 * Save address.
 * @param address
 * @returns
 */
const save = async (address: IAddress): Promise<any> => {
    console.log("address-repo: save", address);

    return new Promise((resolve, error) => {
        dbClient.put(
            {
                TableName: TABLE_NAME,
                Item: address,
            },
            async function (err, data) {
                if (err) {
                    console.error(err);
                    error(err);
                } else {
                    console.log("PutItem succeeded:", data);
                    resolve(address);
                }
            }
        );
    });
};

/**
 * Add address for a user
 * @param address 
 * @param addressUserMapping 
 * @param userPk 
 * @returns 
 */
const addUserAddress = async (address: IAddress, addressUserMapping: IAddressUserMapping, userPk: string): Promise<IAddress> => {
    console.log('address repo: addUserAddress');
    const params = {
        TransactItems: [
            {
                Put: {
                    TableName: TABLE_NAME,
                    Item: address,
                },
            },
            {
                Put: {
                    TableName: TABLE_NAME,
                    Item: addressUserMapping
                }
            },
            {
                Update: {
                    TableName: TABLE_NAME,
                    Key: { "pk": userPk, "sk": userPk },
                    UpdateExpression: "SET #addresses = list_append(#addresses, :address)",
                    ExpressionAttributeNames: {
                        "#addresses": "addresses",
                    },
                    ExpressionAttributeValues: {
                        ":address": [address]
                    }
                }
            }
        ]
    };

    return new Promise((resolve, error) => {
        dbClient.transactWrite(params, (err, data) => {
            if (err) {
                console.log(`Error in address-repo: addUserAddress ${err}`);
                error(err);
            } else {
                resolve(address);
            }
        });
    });
}

/**
 * Delete address.
 * @param pk
 * @param sk
 * @returns boolean (true | false)
 */
const deleteAddress = async (pk: string, sk: string): Promise<boolean> => {
    console.log("address-repo: delete", pk, sk);

    return new Promise((resolve, error) => {
        dbClient.delete(
            {
                TableName: TABLE_NAME,
                Key: { "pk": pk, "sk": sk }
            },
            async function (err, data) {
                if (err) {
                    console.error(err);
                    error(err);
                } else {
                    console.log("deleteitem succeeded:", data);
                    resolve(true);
                }
            }
        );
    });
};

/**
 * Delete adddress for the user.
 * @param addressPk 
 * @param addressSk 
 * @param addressUserPk 
 * @param addressUserSk 
 * @param userPk 
 * @param addressIndex 
 * @returns 
 */
const deleteUserAddress = async (
    addressPk: string,
    addressSk: string,
    addressUserPk: string,
    addressUserSk: string,
    userPk: string,
    addressIndex: number): Promise<void> => {
    console.log('address repo: delete user address', addressPk, addressSk, addressUserPk, addressUserSk, userPk, addressIndex);

    const params = {
        TransactItems: [
            {
                Delete: {
                    TableName: TABLE_NAME,
                    Key: {
                        "pk": addressPk,
                        "sk": addressSk
                    },
                },
            },
            {
                Delete: {
                    TableName: TABLE_NAME,
                    Key: {
                        "pk": addressUserPk,
                        "sk": addressUserSk
                    }
                }
            },
            {
                Update: {
                    TableName: TABLE_NAME,
                    Key: { "pk": userPk, "sk": userPk },
                    UpdateExpression: `REMOVE #addresses[${addressIndex}]`,
                    ExpressionAttributeNames: {
                        "#addresses": "addresses",
                    },
                }
            }
        ]
    };

    return new Promise((resolve, error) => {
        dbClient.transactWrite(params, (err, data) => {
            if (err) {
                console.log('address-repo:deleteUserAddress- Error', err);
                error(err);
            } else {
                console.log('delete user address successful', data);
                resolve();
            }
        })
    })
}

/**
 * Update user address
 * @param address 
 * @param userPk 
 * @param addressIndex 
 * @returns 
 */
const updateUserAddress = async (
    address: IAddress,
    userPk: string,
    addressIndex: number): Promise<IAddress> => {
    console.log('address repo: update user address');

    const params = {
        TransactItems: [
            {
                Put: {
                    TableName: TABLE_NAME,
                    Key: {
                        "pk": address.pk,
                        "sk": address.sk
                    },
                    Item: address
                },
            },
            {
                Update: {
                    TableName: TABLE_NAME,
                    Key: { "pk": userPk, "sk": userPk },
                    UpdateExpression: `SET #addresses[${addressIndex}] = :address`,
                    ExpressionAttributeNames: {
                        "#addresses": "addresses",
                    },
                    ExpressionAttributeValues: {
                        ":address": address
                    }
                }
            }
        ]
    };

    return new Promise((resolve, error) => {
        dbClient.transactWrite(params, (err, data) => {
            if (err) {
                console.log('address-repo:updateUserAddress- Error', err);
                error(err);
            } else {
                console.log('update user address successful', data);
                resolve(address);
            }
        })
    })
}

/**
 * Get address.
 * @param partitionKey 
 * @returns 
 */
async function get(partitionKey: string): Promise<IAddress[]> {
    return new Promise((resolve, error) => {
        const params = {
            TableName: TABLE_NAME,
            KeyConditionExpression: 'pk=:pk',
            ExpressionAttributeValues: {
                ':pk': partitionKey
            }
        };

        dbClient.query(params,
            (err, data) => {
                if (err) {
                    console.log(err);
                    error(err);
                } else {
                    console.log('Get address success:', data.Items);
                    const addresses = data.Items as IAddress[]
                    resolve(addresses);
                }
            }
        );
    });
}

/**
 * Get addresses.
 * @param partitionKey array 
 * @returns 
 */
async function getAddresses(partitionKeys: string[]): Promise<IAddress[]> {

    const keys = partitionKeys.map(x => {
        pk:
        {
            S: x
        }
    });

    return new Promise((resolve, error) => {
        const params = {
            "RequestItems": {
                "coach-gurus-entities": {
                    "Keys": keys
                }
            }
        };

        console.log('batch params', params);
        // @ts-ignore
        dbClient.batchGet(params,
            (err, data) => {
                if (err) {
                    console.log(err);
                    error(err);
                } else {
                    console.log('Get address success:', data.Responses);
                    // const addresses = data.Responses? as IAddress[]
                    // resolve(addresses);
                }
            }
        );
    });
}

/**
 * Get addresses by partitionKeys
 * @param partitionKeys 
 * @returns 
 */
const getAddressesByPK = async (partitionKeys: string[]): Promise<IAddress[]> => {
    const db = new DynamoDB();
    partitionKeys = partitionKeys.map((pk, i, arr) => `'${pk}'`);
    const pks = partitionKeys.join(',');
    const statement = `SELECT * FROM "${TABLE_NAME}" WHERE "pk" in (${pks})`;
    console.log(statement);
    return new Promise((resolve, error) =>
        db.executeStatement({
            Statement: statement
        }, (err, data) => {
            if (err) {
                console.log(err);
                error(err);
            } else {
                console.log(data);
                const addresses = data.Items?.map((item, i, arr) => AWS.DynamoDB.Converter.unmarshall(item) as IAddress);

                resolve(addresses!);
            }
        })
    );
};

const addressRepo = {
    save,
    addUserAddress,
    deleteUserAddress,
    updateUserAddress,
    get,
    getAddresses,
    getAddressesByPK,
    deleteAddress,
};

export default addressRepo;