const {
    DynamoDBClient,
    QueryCommand,
    PutItemCommand,
    GetItemCommand,
    DeleteItemCommand,
    UpdateItemCommand,
    ScanCommand,
    DeleteTableCommand,
    CreateTableCommand
  } = require('@aws-sdk/client-dynamodb');
  
  const dynamoClient = new DynamoDBClient({
    accessKey: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    apiVersion: process.env.AWS_API_VERSION,
    region: process.env.AWS_REGION,
    endpoint:process.env.AWS_DYNAMO_ENDPOINT
  });
  
  module.exports = {
    dynamoClient,
    QueryCommand,
    PutItemCommand,
    GetItemCommand,
    DeleteItemCommand,
    UpdateItemCommand,
    ScanCommand,
    DeleteTableCommand,
    CreateTableCommand
  };