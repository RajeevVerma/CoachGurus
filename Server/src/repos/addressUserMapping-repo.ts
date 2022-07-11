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
 * Get near by addresses  
 */
const getAddressMappedUserIds = (partitionKeys: string[]): Promise<IAddressUserMapping[]> => {
    let keyConditionExpression: string = '';
    let expressionAttributeValue: any = {};
    partitionKeys.forEach((key, index, partitionKeys) => {
        if (index > 0) {
            keyConditionExpression += ' OR ';
        }
        const attribute = `:pk-${index}`;
        keyConditionExpression += `PK=${attribute}`;
        expressionAttributeValue.push({ attribute: { "S": key } });
    });
    const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: keyConditionExpression,
        ExpressionAttributeValues: expressionAttributeValue
    };

    return new Promise((resolve, error) => {
        dbClient.query(params,
            (err, data) => {
                if (err) {
                    error(err);
                } else {
                    const addressUserMappings = data.Items as IAddressUserMapping[];
                    resolve(addressUserMappings);
                }
            }
        );
    });
}

export default {
    save,
    getAddressMappedUserIds
} as const;
