const serviceCarevigerProfile = require('../services/caraverigerProfile');


const postCaravigerProfile = async(req,res) =>{
    try{
        await serviceCarevigerProfile.createCaravigerProfile(req.body);
        res.status(200).json({success:true})
    }
    catch(error){
    console.log(error)
    throw error;
    }
};


const updateCareviger = async(req,res) =>{
    try{
        const {email} = req.params;
        const {name,lastName,descriptionJob, dateAvailable, phone, socialMedia} = req.body;
        await serviceCarevigerProfile.updateCareviger({email, name,lastName, descriptionJob, dateAvailable, phone, socialMedia});
        res.status(200).json(`user ${email} updated succesfully`);
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
        if(!data.email) return res.status(404).json({msg:"user doesnt exist"});
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

module.exports = {postCaravigerProfile, getCareviger, deleteCareviger, updateCareviger}