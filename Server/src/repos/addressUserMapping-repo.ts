import AWS from 'aws-sdk';

import { IAddressUserMapping } from '@models/addressUserMapping-model';
import { serviceConfigOptions } from "@shared/constants/aws-config";

console.log(serviceConfigOptions);
AWS.config.update(serviceConfigOptions);

const dbClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME: string = "coach-gurus-entities";

/**
 * Save address user mapping.
 * @param addressUserMapping
 * @returns
 */
const save = async (addressUserMapping: IAddressUserMapping): Promise<IAddressUserMapping> => {
    console.log("addressUserMapping-repo", addressUserMapping);

    return new Promise((resolve, error) => {
        dbClient.put(
            {
                TableName: TABLE_NAME,
                Item: addressUserMapping,
            },
            async function (err, data) {
                if (err) {
                    console.error(err);
                    error(err);
                    throw err;
                } else {
                    console.log("PutItem succeeded:", data);
                    resolve(addressUserMapping)
                }
            }
        );
    });
};

/**
 * Get address user map.
 * @param partitionKey 
 * @returns 
 */
const getAddressUserMappings = (partitionKey: string): Promise<IAddressUserMapping[]> => {
    console.log('Get address user mappings -', partitionKey);
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'pk=:pk',
        ExpressionAttributeValues: { ':pk': partitionKey }
    };

    return new Promise((resolve, error) => {
        dbClient.query(params,
            (err, data) => {
                if (err) {
                    console.log(err);
                    error(err);
                } else {
                    const addressUserMappings = data.Items as IAddressUserMapping[];
                    console.log(addressUserMappings);
                    resolve(addressUserMappings);
                }
            }
        );
    });
}

export default {
    save,
    getAddressUserMappings
} as const;
