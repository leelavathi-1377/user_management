const bcrypt = require("bcrypt");
const userModel = require("../models/user");
const jwt = require("jsonwebtoken");
const { getResponseObject } = require("../helpers/supporter");

module.exports.userLogin = async (req, res) => {
    const response = getResponseObject();
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            response.message = `User with email ${email} not found!`;
            return res.status(404).json(response);
        }

        const passwordMatch = await bcrypt.compare(password, user.hashPassword);

        if (!passwordMatch) {
            response.message = "Incorrect password!";
            return res.status(401).json(response);
        }
        const token = jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: '24h' });
        response.data = { user_id: user.user_id, user_name: user.user_name , token : token};
        response.status = "success";
        response.message = "Login successful";
        return res.status(200).json(response);
    } catch (err) {
        console.error("Error:", err);
        err.message = "Internal server error";
        next(err)
    }
};
