const bcrypt = require("bcrypt")
const userModel = require("../models/user")
const  { getResponseObject } =  require("../helpers/supporter")

module.exports.userRegistration = async (req, res, next) => {
  try {
        const response = getResponseObject();
        const { user_id, name, email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!name || !email || !password) {
            response.message = 'email, password and name fields are required!';
            return res.status(400).json(response);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const existingUser = await userModel.findOne({ user_id });

        if (!email || !emailRegex.test(email)) {
            response.message = 'Invalid email address!';
            return res.status(400).json(response);
        }
        if (!password || !passwordRegex.test(password)) {
            response.message = `Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character!`;
            return res.status(400).json(response);
        }

        if (existingUser) {
            response.message = `User already exists with user_id: ${user_id}`;
            return res.status(400).json(response);
        }
        const newUser = new userModel({
            user_id,
            email,
            name,
            password,
            hashPassword,
        });
        const savedUser = await newUser.save();
        response.data = savedUser;
        response.status = 'success';
        response.message = 'User created successfully!';
        return res.status(200).json(response);
    } 
    catch (err) {
        console.error('Error creating user!', err);
        err.message = 'Error creating user';
        next(err)
    }
};





