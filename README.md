# CoachGurus

GIT Branch Workflow

![image](https://user-images.githubusercontent.com/107014620/172281264-ac2f5a9a-4316-43d0-bbaa-cdb9cf0798d0.png)

# TOOLS -

ANDROID STUDIO - https://developer.android.com/studio

npm install -g nodemon

java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 8000

Get Google Key
keytool -exportcert -keystore C:\Users\Anshu\.android\debug.keystore -list -v

CREATE TABLE IN DYNAMO DB
aws dynamodb create-table --table-name coach-gurus-entities --attribute-definition AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=S --key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --endpoint http://localhost:8000
