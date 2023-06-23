const ServicePostCarevigerProfile = require('../services/createCareviger');


const postCaravigerProfile = async(req,res) =>{
    try{
        await ServicePostCarevigerProfile.createCaravigerProfile(req.body)
        console.log(req.body, "soy el body qe  va al service");
        res.status(200).json({success:true})
    }
    catch(error){
    console.log(error)
    throw error
    }
}

module.exports = {postCaravigerProfile}