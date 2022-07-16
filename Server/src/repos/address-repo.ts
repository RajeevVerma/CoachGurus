import AWS from 'aws-sdk';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { IAddress } from '../models';
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
    console.log("address-repo", address);

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
    get,
    getAddresses,
    getAddressesByPK
};

export default addressRepo;