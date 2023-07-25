exports.validateBody = (schema) => {
    return async(req,res,next)=>{
        try{
            await schema.validateAsync(req.body)
            next();
        }
        catch(error){
            console.log(error)
            res.status(400).json(error.details)
        }
    }
};