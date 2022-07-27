# CoachGurus - Backend Configuration Steps
Node Version > 16.0

git clone https://github.com/RajeevVerma/CoachGurus.git

cd Server

npm install

# Local - Dynamo DB Setup
Make sure you have JAVA - JRE. If not download from https://www.java.com/en/download/manual.jsp

Go to Command Prompt and run the file. [ If you Don't have admin access to run this, use VS -> Tools -> Command Line --> Developer Command Prompt - a.k.a *VS Terminal*].

Create a Folder Named -  AWS_Dynamo_DB, outside of *CoachGurus* Project Folder

Go to - https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html

Download - Asia Pacific (Mumbai) Region (.zip) file to AWS_Dynamo_DB folder Location.

Make Sure You have *db_start.bat* file, if not get from those who already running DB locally.

Go to Command Prompt / VS Terminal and run the db_start.bat file.

# AWS Configuration
Create an account or Make sure you have an account in AWS.

Open a New Command Prompt in AWS_Dynamo_DB file path.

type --> aws configure 

provide --> Access Key & Secret Key

type --> Default region name [None]: ap-south-1

type --> Default output format [None]: json


# Dynamodb Admin
Go to - CoachGurus/Server Command Prompt

npm install -g dynamodb-admin

set DYNAMO_ENDPOINT=http://localhost:8000

npm run create-db

dynamodb-admin


# Run Locally
Open One more Terminal in CoachGurus/Server Command Prompt

npm run build

npm run start:dev

Open Browser and check - http://localhost:8001/tables/coach-gurus-entities