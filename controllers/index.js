let controllerObj = {}

controllerObj = Object.assign(controllerObj, require("./registration"));
controllerObj = Object.assign(controllerObj, require("./login"))
controllerObj = Object.assign(controllerObj, require("./createUser"))
controllerObj = Object.assign(controllerObj, require("./getAllUsers"));
controllerObj = Object.assign(controllerObj, require("./getUserById"))
controllerObj = Object.assign(controllerObj, require("./updateUser"))
controllerObj = Object.assign(controllerObj, require("./deleteUser"));

module.exports = controllerObj
