import { serviceConfigOptions } from "../../shared/constants/aws-config";
import * as AWS from "aws-sdk";

AWS.config.update(serviceConfigOptions);

var dynamodb = new AWS.DynamoDB();
var params = {
  TableName: "Users",
  KeySchema: [
    { AttributeName: "email", KeyType: "HASH" }, //Partition key

  ],
  AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
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
