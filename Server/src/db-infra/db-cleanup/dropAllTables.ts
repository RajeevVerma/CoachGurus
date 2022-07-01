import * as AWS from "aws-sdk";
import { serviceConfigOptions } from "../../shared/constants/aws-config";

AWS.config.update(serviceConfigOptions);

var dynamodb = new AWS.DynamoDB();

dynamodb.listTables({}, function (err, data) {
  if (err) console.error(err, err.stack);

  if (data.TableNames) {
    for (let tableName of data.TableNames) {
      dynamodb.deleteTable({ TableName: tableName }, function (err, data) {
        if (err) console.error(err, err.stack);
        else console.log("Deleted", tableName);
      });
    }
  }
});
