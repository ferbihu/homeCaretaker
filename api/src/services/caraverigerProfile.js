const {PutItemCommand, GetItemCommand, DeleteItemCommand, UpdateItemCommand, dynamoClient} = require('../components/dynamoDb');
const {mapGetCareviger} = require('../mappers');

const createCaravigerProfile = async(data) =>{
        const params = {
            TableName : process.env.TABLE_NAME_DYNAMODB,
            Item : {
                email : {S: data.email},
                name: {S: data.name},
                lastName: {S: data.lastName}
            }
        }
        const commnad = new PutItemCommand(params);
        await dynamoClient.send(commnad);
};

const updateCareviger = async(data) =>{
    const input = {
        TableName: process.env.TABLE_NAME_DYNAMODB,
        Key: {
            email: {S: data.email}       
        },
        UpdateExpression: "set #n = :n, #l = :l",
        ExpressionAttributeValues: {
          ':n' : {S: data.name},
          ':l' : {S: data.lastName}
        },
        ExpressionAttributeNames: {
            "#n": "name",
            "#l" : "lastName"
        }
    }
    const command = new UpdateItemCommand(input);
    const response = await dynamoClient.send(command);
    return (response, 'user updated successfully');
};

const getCareviger = async(email) => {
    const params = {
      TableName: process.env.TABLE_NAME_DYNAMODB,
      Key: {
        email: {S: email}
      }
    };
    const command = new GetItemCommand(params);
    const response = await dynamoClient.send(command);
    //el mapper filtra la data para que la pueda devolver mas limpia al front
    return mapGetCareviger(response);
};

const deleteCareviger = async(email)=>{
    const params = {
        TableName: process.env.TABLE_NAME_DYNAMODB,
        Key: {email: {S: email}}

    };
    const command = new DeleteItemCommand(params);
    const response = await dynamoClient.send(command);
    return (response, "user delete successfully");
}
module.exports= {createCaravigerProfile, getCareviger, deleteCareviger, updateCareviger}