const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV;
const { secretKey } = require('../config/config')[env];

const generateToken = (data) => {
    return jwt.sign({ id: data.id }, secretKey, { expiresIn: '6h' })
    
    
}
const verifyToken = (token) => {
    console.log('token-in-jwt:',token);
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
            
        })
    })
}
module.exports = {
    generateToken,
    verifyToken
}