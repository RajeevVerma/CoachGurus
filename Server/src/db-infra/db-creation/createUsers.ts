import { dbEndpoint, serviceConfigOptions, setProductionEndpoint } from "../../shared/constants/aws-config";
import * as AWS from "aws-sdk";
import commandLineArgs from "command-line-args";

const options = commandLineArgs([
    {
        name: "env",
        alias: "e",
        defaultValue: "development",
        type: String,
    },
]);

console.log("options", options);

if (options.env === "prod") {
    setProductionEndpoint();
    console.log("dbEndpoint set", dbEndpoint);
}
console.log('DynamoDb config.', serviceConfigOptions);
AWS.config.update(serviceConfigOptions);

var dynamodb = new AWS.DynamoDB();
var params = {
    TableName: "coach-gurus-entities",
    AttributeDefinitions: [
        {
            "AttributeName": "pk",
            "AttributeType": "S"
        },
        {
            "AttributeName": "sk",
            "AttributeType": "S"
        }
    ],
    KeySchema: [
        {
            AttributeName: "pk",
            KeyType: "HASH"
        }, //Partition key
        {
            "AttributeName": "sk",
            "KeyType": "RANGE"
        }

    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
    },
};


dynamodb.createTable(params, function (err, data) {
    if (err) {
        console.error(
            "Unable to create table. Error JSON:",
            JSON.stringify(err, null, 2)
        );
    } else {
        console.log(
            "Created table. Table description JSON:",
            JSON.stringify(data, null, 2)
        );
    }
});
