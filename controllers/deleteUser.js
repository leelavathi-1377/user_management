const usersModel = require("../models/user")
const  { getResponseObject } =  require("../helpers/supporter")

//deleting a user By Id
module.exports.deleteUserById = async(req, res, next) =>{
    const response = getResponseObject()
    const id = req.params.user_id
    try{
        let users
        users = await usersModel.find({user_id : id})
        if(!users.length){ 
            response.message = "user not found!"
            return res.status(401).json(response)
        }
        await usersModel.deleteOne({user_id : id})
        response.status = "success"
        response.message = "user deleted succesfully!"
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        next(error)
    }
}