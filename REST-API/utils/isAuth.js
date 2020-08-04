const env = process.env.NODE_ENV;
const { verifyToken } = require('./jwt');
const User = require('../models/User');
const TokenBlacklist=require('../models/TokenBlackList');
const jwt = require('./jwt');
const { cookieName } = require('../config/config')[env];

module.exports =  (redirectAuthenticated = true) => {
    return async function (req, res, next) {
        
        const token = req.headers.authorization || '';
     //   console.log('token-to-verify',token);       
        try {
            const result =await jwt.verifyToken(token);

           // console.log('Result: ',result);
            const blacklistToken =await TokenBlacklist.findOne({ token });
            if(blacklistToken){
                return Promise.reject(new Error('blacklisted token'));
            }
           // console.log('result-varify-token',result);
            const user = await User.findById(result.id);
           console.log('User-in-isAuth: ',user);
            if (user) {
                req.user = user;
              //  console.log('User -in-req:',req.user)
                next();
            } else {
                res.redirect('/user/login');
            }

        }  catch(err) {
            if (!redirectAuthenticated) { next(); return; }

            if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                res.status(401).send('UNAUTHORIZED!');
                return;
            }

            next(err);
        }

    }
}