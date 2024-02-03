const usersModel = require("../models/user")
const  { getResponseObject } =  require("../helpers/supporter")

//get the details of the user by Id
module.exports.getUserById = async(req, res) =>{
    const response = getResponseObject()
    const id = req.params.user_id
    try{
        let users
        users = await usersModel.find({user_id : id} , {_id : 0 , password : 0 , hashPassword : 0})
        if(!users.length){ 
            response.message = "user not found!"
            return res.status(401).json(response)
        }
        response.data = users
        response.status = "success"
        response.message = "user details fetched succefully!"
        return res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        next(err)
    }
}