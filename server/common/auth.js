const jwt = require('jsonwebtoken');
const secretKey = process.env.AUTH_SECRET;
const errors = require('./errors');

const generateToken = (account) => {
    return jwt.sign(account, secretKey);
}

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        throw new errors.BadRequestError(`auth`, `verifyToken`, `Invalid token ${token}.`);
    }
}

const authenticate = (req, res, next, authLevel) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) throw new errors.UnauthorizedError(`auth`, `authenticate`, `Access denied. No token provided.`);

    try {
        const decoded = jwt.verify(token, secretKey);
        req.account = decoded;
        if (decoded.authLevel >= authLevel) {
            next();
        }
        throw new errors.UnauthorizedError(`auth`, `authenticate`, `Access denied. Not enough permissions.`);
    } catch (ex) {
        throw new errors.BadRequestError(`auth`, `authenticate`, `Invalid token ${token}.`);
    }
}

module.exports = {
    authenticate: authenticate,
    generateToken: generateToken,
    verifyToken: verifyToken
}