const jwt = require('jsonwebtoken');
function authenticate(req, res, next) {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        const error = new Error('Unauthorized Access');
        error.status = 401;
        return next(error);
    }

    const authToken = token.split(' ')[1];

    try {
        const decodedToken = jwt.verify(authToken, 'secret');
        req.user = decodedToken;
        next();
    } catch (err) {
        const error = new Error('Unauthorized Access');
        error.status = 401;
        return next(error);
    }
}

module.exports = authenticate;
