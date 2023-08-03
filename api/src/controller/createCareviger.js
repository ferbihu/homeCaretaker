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
        const user = await serviceCarevigerProfile.getCareviger(email); 
        if(user.email === undefined) return res.status(404).json({msg:"user doesnt exist"});
        const {name,lastName,descriptionJob, dateAvailableFrom, dateAvailableUntil, phone, socialMedia} = req.body;
        await serviceCarevigerProfile.updateCareviger({email, name,lastName, descriptionJob, dateAvailableFrom, dateAvailableUntil, phone, socialMedia});
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

const searchCarevigerByDateAvailable = async(req,res)=>{
    try{
        const {dateAvailableFrom, dateAvailableUntil} = req.body;
        const carevigerSearch = await serviceCarevigerProfile.searchCarevigerByDateAvailable(dateAvailableFrom, dateAvailableUntil);
        res.status(200).send(carevigerSearch);
    }
    catch(error) {
        console.log(error)
        throw error;
    }
}

module.exports = {postCaravigerProfile, getCareviger, deleteCareviger, updateCareviger, searchCarevigerByDateAvailable}