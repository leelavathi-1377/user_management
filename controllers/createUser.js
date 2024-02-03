const bcrypt = require("bcrypt")
const usersModel = require("../models/user")
const  { getResponseObject } =  require("../helpers/supporter")

//creating a user
module.exports.createUser = async(req, res, next) =>{
    const response = getResponseObject()
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const users = await new usersModel({
        user_id : req.body.user_id,
        email :  req.body.email,
        name : req.body.name,
        password : req.body.password,
        hashPassword
    })
    try{
        const user = await usersModel.find({user_id: req.body.user_id})
        if(user.length){
          response.message = `user has already exists with the user_id : ${req.body.user_id}!`
          return res.status(400).json(response)
        }
        const userData = await users.save()
        response.data = userData
        response.status = "sucess"
        response.message = "user created succesfully!"
        return res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        next(err)
    }
}


