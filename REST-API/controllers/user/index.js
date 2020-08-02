const User = require('../../models/User');
const { validationResult, body } = require('express-validator');
const jwt = require('../../utils/jwt.js');
const env = process.env.NODE_ENV;
const { cookieName } = require('../../config/config.js')[env];
const TokenBlackList = require('../../models/TokenBlackList');


module.exports = {
    get: (req, res, next) => {
        User.find()
            .then((users) => res.send(users))
            .catch(next)

    },
    post: {
        //POST REGISTER
        register: (req, res, next) => {
            const { email, password, authorName } = req.body;
            console.log('Email')
            User.create({ email, password, authorName })
                .then((user) => {
                    const token = jwt.generateToken({ id: user._id });
                    res.header("Authorization", token).send(user);
                })
                .catch(next);

        },
        //POST VERIFY LOGIN
        verifyLogin:async (req, res, next) => {
            const token = req.body.token || '';
          Promise.all([
              jwt.verifyToken(token),
              TokenBlackList.findOne({ token })
          ])
              .then(([data, blacklistToken]) => {
                  if (blacklistToken) { return Promise.reject(new Error('blacklisted token')) }
  
                  User.findById(data.id)
                      .then((user) => {
                          return res.send({
                            status: true,
                            user
                          })
                      });
              })
              .catch(err => {
                  if (!redirectAuthenticated) { next(); return; }
  
                  if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                      res.status(401).send('UNAUTHORIZED!');
                      return;
                  }
  
                  res.send({
                    status: false
                  })
              })
        },
        //POST LOGIN
        login: (req, res, next) => {
            const { email, password } = req.body
            User.findOne({ email })
                .then((user) => Promise.all([user, user.passwordsMatch(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid password!');
                    }
                    const token = jwt.generateToken({ id: user._id });
                    
                    res.header("Authorization", token).send(user);
                })
                .catch(next);

        },
        //POST LOGOUT
        logout: (req, res, next) => {
            const token = res.cookie[cookieName];

            TokenBlackList.create({ token })
                .then(() => {
                    res.clearCookie(cookieName).send('Successfully logged out!')
                })
                .catch(next);
        }
    },
    put: (req, res, next) => {
        const id = req.params.id;
        const { email, password } = req.body;
        User.update({ _id: id }, { email, password })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next);
    },
    delete: (req, res, next) => {
        const id = req.params.id;
        User.deleteOne({ _id: id })
            .then((deletedUser) => res.send(deletedUser))
            .catch(next);
    }
};
