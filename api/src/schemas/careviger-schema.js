const Joi = require('joi');

const carevigerSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    descriptionJob: Joi.string(),
    dateAvailable: Joi.string(),
    phone: Joi.string().required(),
    socialMedia: Joi.object({
        facebook : Joi.string(),
        instagram: Joi.string(),
        twitter: Joi.string()
    })
});


module.exports = { carevigerSchema }