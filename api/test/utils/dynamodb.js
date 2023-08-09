// import { DeleteTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

// const client = new DynamoDBClient({});
const {DeleteTableCommand,CreateTableCommand, dynamoClient} = require('../../src/components/dynamoDb');


const createTable = () => {
  const command = new CreateTableCommand({
    AttributeDefinitions: [
      {
        AttributeName: 'email',
        AttributeType: 'S',
      }
    ],
    KeySchema: [
      {
        AttributeName: 'email',
        KeyType: 'HASH',
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
    TableName: process.env.TABLE_NAME_DYNAMODB,
  });
  return dynamoClient.send(command);
};


const truncateDataBase = async () => {
  const command = new DeleteTableCommand({
    TableName: process.env.TABLE_NAME_DYNAMODB
  });
  const response = await dynamoClient.send(command);
  return response;
};

const regenerateTable = async ()=>{
  await truncateDataBase();
  await createTable();
}

module.exports = {createTable, truncateDataBase, regenerateTable}