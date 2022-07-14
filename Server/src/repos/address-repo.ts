import AWS from 'aws-sdk';

import { IAddress } from '../models';
import { serviceConfigOptions } from "@shared/constants/aws-config";

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
                    throw err;
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

const addressRepo = {
    save,
    get
};

export default addressRepo;