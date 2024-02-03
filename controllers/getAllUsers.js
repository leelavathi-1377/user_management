const usersModel = require("../models/user")
const  { getResponseObject } =  require("../helpers/supporter")


//Get all the detials of the user
module.exports.getAllUsers = async(req, res, next) =>{
    const response = getResponseObject()
    try{
        const users = await usersModel.find({} , {_id : 0, password : 0 , hashPassword : 0})
        if(!users.length){
            response.message = `No user records existing!`
            return res.status(400).json(response)
        }
        response.data = users
        response.status = "success"
        response.message = "user details fetched succesfully!"
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        next(err)
    }
}
