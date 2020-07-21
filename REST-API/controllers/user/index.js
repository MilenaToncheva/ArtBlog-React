const User = require('../../models/User');
const { validationResult, body } = require('express-validator');
const jwt = require('../../utils/jwt');
const env = process.env.NODE_ENV;
const { cookieName } = require('../../config/config')[env];
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
            const { username, password } = req.body;
            User.create({ username, password })
                .then((user) => res.send(user))
                .catch(next)

        },
        //POST LOGIN
        login: (req, res, next) => {
            const { username, password } = req.body

            User.findOne({ username })
                .then((user) => Promise.all([user, user.passwordsMatch(user.password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send('Invalid password!');
                    }
                    const token = jwt.generateToken({ id: user._id });
                    res.cookie(cookieName, token).send(user);
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
                .catch(next)
        }
    },
    put: (req, res, next) => {
        const id = req.params.id;
        const { username, password } = req.body;
        User.update({ _id: id }, { username, password })
            .then((updatedUser) => res.send(updatedUser))
            .catch(next)
    },
    delete: (req, res, next) => {
        const id = req.params.id;
        User.deleteOne({ _id: id })
            .then((deletedUser) => res.send(deletedUser))
            .catch(next)
    }
};
