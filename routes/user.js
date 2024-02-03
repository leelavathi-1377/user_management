const express = require("express")
const router = express.Router()

const controller = require("../controllers/index")
const authenticate = require("../middleware/authentication")

router.post('/registration',controller.userRegistration);
router.post('/login', controller.userLogin);

//crud operations

router.post("/create" , authenticate, controller.createUser)
router.get('/users', authenticate, controller.getAllUsers);
router.get('/users/:user_id',authenticate,  controller.getUserById);
router.put("/users/:user_id" , authenticate, controller.updateUser)
router.delete('/users/:user_id', authenticate, controller.deleteUserById);

module.exports = router