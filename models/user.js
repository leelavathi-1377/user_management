const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_id:{
        type : Number,
        required : true,
        unique: true
    },
    name : {
        type : String,
        required : true
    } ,
    email : {
        type :String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    hashPassword :{
        type : String,
        required : true
    }
})
userSchema.set('versionKey', false);

module.exports = mongoose.model('User' , userSchema)