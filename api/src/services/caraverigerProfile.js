const {PutItemCommand, GetItemCommand, DeleteItemCommand, UpdateItemCommand, ScanCommand, dynamoClient} = require('../components/dynamoDb');
const {mapGetCareviger, mapSearchCareviger} = require('../mappers');

const createCaravigerProfile = async(data) =>{
        const params = {
            TableName : process.env.TABLE_NAME_DYNAMODB,
            Item : {
                email : {S: data.email},
                name: {S: data.name},
                lastName: {S: data.lastName},
                descriptionJob: {S: data.descriptionJob},
                dateAvailableFrom: {S: data.dateAvailableFrom},
                dateAvailableUntil: {S: data.dateAvailableUntil},
                phone: {S: data.phone},
                socialMedia: {M:{
                ...(data.socialMedia.facebook && {facebook: {S: data.socialMedia.facebook}}), 
                ...(data.socialMedia.instagram && {instagram: {S: data.socialMedia.instagram}}), 
                ...(data.socialMedia.twitter && {twitter: {S: data.socialMedia.twitter}})
                }}
            }

        }
        const commnad = new PutItemCommand(params);
        return await dynamoClient.send(commnad);
};

const updateCareviger = async(data) =>{
    const updateBody = `set ${data.name ? `#n = :n,` : "" } ${data.lastName ? `#l = :l,` : "" } ${data.descriptionJob ? `#descriptionJob = :descriptionJob,` : "" } ${data.dateAvailableFrom ? `#dAvailableF = :dAvailableF,` : "" } ${data.dateAvailableUntil ? `#dAvailableU = :dAvailableU,` : "" } ${data.phone ? `#phone = :phone,` : "" } ${data.socialMedia ? `#socialMedia = :socialMedia` : "" }`
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
          ...(data.dateAvailableFrom && {':dAvailableF' : {S: data.dateAvailableFrom}}),
          ...(data.dateAvailableUntil && {':dAvailableU':{S: data.dateAvailableUntil}}),
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
            ...(data.dateAvailableFrom && {"#dAvailableF":"dateAvailableFrom"}),
            ...(data.dateAvailableUntil && {"#dAvailableU":"dateAvailableUntil"}),
            ...(data.phone && {"#phone":"phone"}),
            ...(data.socialMedia && { "#socialMedia": "socialMedia"})
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

const searchCarevigerByDateAvailable = async(dateAvailableFrom,dateAvailableUntil)=>{
    const params = {    
    ExpressionAttributeNames: {
        "#dAvailableF":"dateAvailableFrom",
        "#dAvailableU":"dateAvailableUntil",
        "#email":"email",
        "#n":"name",
        "#l":"lastName",
        "#phone":"phone"
    },
    ExpressionAttributeValues: {
        ":dAvailableF" : {S: dateAvailableFrom},
        ":dAvailableU" : {S:dateAvailableUntil}
    },
    FilterExpression: "#dAvailableF >= :dAvailableF AND #dAvailableU <= :dAvailableU",
    ProjectionExpression: "#dAvailableF, #dAvailableU, #email, #n, #l, #phone",
    TableName: process.env.TABLE_NAME_DYNAMODB
    }
    const command = new ScanCommand(params);
    const response = await dynamoClient.send(command);
    return mapSearchCareviger(response);
}

module.exports= {createCaravigerProfile, getCareviger, deleteCareviger, updateCareviger, searchCarevigerByDateAvailable}