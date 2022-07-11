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
 * Get near by addresses  
 */
const getNearbyAddresses = (partitionKeys: string[]): Promise<IAddress[]> => {
    let keyConditionExpression: string = '';
    let expressionAttributeValue: any = {};
    partitionKeys.forEach((key, index, partitionKeys) => {
        if (index > 0) {
            keyConditionExpression += ' OR ';
        }
        const attribute = `:pk${index}`;
        keyConditionExpression += `pk=${attribute}`;
        expressionAttributeValue[attribute] = { "S": key };
    });
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValue
    };
    console.log(params)
    return new Promise((resolve, error) => {
        dbClient.query(params,
            (err, data) => {
                if (err) {
                    console.log(err);
                    error(err);
                } else {
                    console.log(data.Items);
                    const addrs = data.Items as IAddress[];
                    resolve(addrs);
                }
            }
        );
    });
}

const addressRepo = {
    save,
    getNearbyAddresses
};

export default addressRepo;