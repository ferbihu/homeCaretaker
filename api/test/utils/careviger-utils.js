const serviceCareviger = require('../../src/services/caraverigerProfile');

const createCarevigerMock = async(data) =>{
    const userMock = {
        name:"fer",
        lastName:"bihu",
        email:"fer@gmail",
        descriptionJob:"careviger papa",
        phone:"123121",
        dateAvailable: "12-36-25",
        socialMedia:{
            facebook:"facebook",
            instagram:"instagram",
            twitter:"twitter"
        },
        ...data
    }    
    return await serviceCareviger.createCaravigerProfile(userMock);
}

module.exports = {createCarevigerMock}