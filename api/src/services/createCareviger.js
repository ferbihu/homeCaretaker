const {PutItemCommand, dynamoClient} = require('../components/dynamoDb');

const createCaravigerProfile = async(data) =>{
        console.log(data, 'estoy en el service del create');
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
}

module.exports= {createCaravigerProfile}