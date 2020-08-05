const env = process.env.NODE_ENV;
const { verifyToken } = require('./jwt');
const User = require('../models/User');

const { cookieName } = require('../config/config')[env];

module.exports = () => {
    return async function (req, res, next) {
        const token =  req.headers.authorization || '';
        if (token === '') {
            next();
            return;

        }
        res.status(401).send('UNAUTHORIZED!');
        return;
    }
}
