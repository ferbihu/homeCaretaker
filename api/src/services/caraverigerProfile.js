const {PutItemCommand, GetItemCommand, DeleteItemCommand, UpdateItemCommand, dynamoClient} = require('../components/dynamoDb');
const {mapGetCareviger} = require('../mappers');

const createCaravigerProfile = async(data) =>{
        const params = {
            TableName : process.env.TABLE_NAME_DYNAMODB,
            Item : {
                email : {S: data.email},
                name: {S: data.name},
                lastName: {S: data.lastName},
                descriptionJob: {S: data.descriptionJob},
                dateAvailable: {S: data.dateAvailable},
                phone: {S: data.phone},
                socialMedia: {M:{
                ...(data.socialMedia.facebook && {facebook: {S: data.socialMedia.facebook}}), 
                ...(data.socialMedia.instagram && {instagram: {S: data.socialMedia.instagram}}), 
                ...(data.socialMedia.twitter && {twitter: {S: data.socialMedia.twitter}})
                }}
            }

        }
        const commnad = new PutItemCommand(params);
        await dynamoClient.send(commnad);
};

const updateCareviger = async(data) =>{
    const updateBody = `set ${data.name ? `#n = :n,` : "" } ${data.lastName ? `#l = :l,` : "" } ${data.descriptionJob ? `#descriptionJob = :descriptionJob,` : "" } ${data.dateAvailable ? `#dAvailable = :dAvailable,` : "" } ${data.phone ? `#phone = :phone,` : "" } ${data.socialMedia ? `#socialMedia = :socialMedia` : "" }`
    const input = {
        TableName: process.env.TABLE_NAME_DYNAMODB,
        Key: {
            email: {S: data.email}       
        },
        UpdateExpression: updateBody,
        ExpressionAttributeValues: {
          ...(data.name && {':n' : {S: data.name}}),
          ...(data.lastName && {':l' : {S: data.lastName}}),
          ...(data.descriptionJob && { ':descriptionJob': {S: data.descriptionJob}}),
          ...(data.dateAvailable && {':dAvailable' : {S: data.dateAvailable}}),
          ...(data.phone && {':phone': {S: data.phone}}),
          ...(data.socialMedia && {':socialMedia': {M:{
            ...(data.socialMedia.facebook && {facebook: {S: data.socialMedia.facebook}}), 
            ...(data.socialMedia.instagram && {instagram: {S: data.socialMedia.instagram}}), 
            ...(data.socialMedia.twitter && {twitter: {S: data.socialMedia.twitter}})
            }}})
        },
        ExpressionAttributeNames: {
            ...(data.name && {"#n": "name"}),
            ...(data.lastName && {"#l" : "lastName"}),
            ...(data.descriptionJob && {"#descriptionJob": "descriptionJob"}),
            ...(data.dateAvailable && {"#dAvailable":"dateAvailable"}),
            ...(data.phone && {"#phone":"phone"}),
            ...(data.socialMedia && { "#socialMedia": "socialMedia"})
        }
    }
    console.log(input)
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