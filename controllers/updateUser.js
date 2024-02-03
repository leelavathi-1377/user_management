const usersModel = require("../models/user")
const  { getResponseObject } =  require("../helpers/supporter")

//update the details of the user By Id
module.exports.updateUser = async(req, res) =>{
    const response = getResponseObject()
    const id = req.params.user_id
    const content = req.body
    try{
        let users
        users = await usersModel.find({user_id : id})
        if(!users.length){ 
            response.message = "user not found!"
            return res.status(401).json(response)
        }
        await usersModel.updateOne({user_id : id}, content)
        response.status = "success"
        response.message = "user updated succesfully!"
        return res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        next(err)
    }
}