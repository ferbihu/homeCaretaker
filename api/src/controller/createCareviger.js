const serviceCarevigerProfile = require('../services/createCareviger');


const postCaravigerProfile = async(req,res) =>{
    try{
        await servicePostCarevigerProfile.createCaravigerProfile(req.body);
        console.log(req.body, "soy el body qe  va al service");
        res.status(200).json({success:true})
    }
    catch(error){
    console.log(error)
    throw error;
    }
};

const getCareviger =  async(req,res) =>{
    try{
        const {email} = req.params;
        const data = await serviceCarevigerProfile.getCareviger(email);
        res.status(200).send(data);
    }
    catch(error){
        console.log(error);
        throw error;
    }
};

const deleteCareviger = async(req,res) =>{
    try{
        const {email} = req.params;
        await serviceCarevigerProfile.deleteCareviger(email);
        res.status(200).json(`user ${email} delete succesfully`);
    }
    catch(error){
        console.log(error)
        throw error;
    }
};
module.exports = {postCaravigerProfile, getCareviger, deleteCareviger}