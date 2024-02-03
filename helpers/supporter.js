const getResponseObject = ()=> ({
	status: "error",
	message: "Internal Server error",
	data: {},
	errorCode: null
});


module.exports = {
    getResponseObject
}