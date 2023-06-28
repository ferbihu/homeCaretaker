const {PutItemCommand, GetItemCommand, DeleteItemCommand, dynamoClient} = require('../components/dynamoDb');
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
        console.log("user saved successfully");
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
    console.log(response);
    return (response, "user delete successfully");
}
module.exports= {createCaravigerProfile, getCareviger, deleteCareviger}