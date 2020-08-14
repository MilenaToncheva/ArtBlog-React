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
            .catch(next);

    },
    loadInfo: (req, res, next) => {
        const id = req.params.id;
        User.findById(id)
            .then((userDb) => res.send(userDb))
            .catch(next);
    },
    post: {
        //POST REGISTER
        register: async (req, res, next) => {
          //  const { email, password, authorName, avatar, cv } = req.body;
            //  User.findOne({ email }).then((user) => {
            //      res.status(409).send({ message: `Email ${user.email} already exists! Please try a new one!` })
            //      return;
            //  });
            //  User.create({ email, password, authorName, avatar, cv })
            //      .then((user) => {
            //          const token = jwt.generateToken({ id: user._id });
            //          res.header("Authorization", token).send(user);
            //      })
          
            //      .catch(next);
            try{
                const { email, password, authorName, avatar, cv } = req.body;
                
                const userDb = await User.findOne({ email });
                if (userDb) {
                    res.status(409).send({ message: `Email ${email} already exists! Please try a new one!` })
                    return;
                }
                const user=await  User.create({ email, password, authorName, avatar, cv });
                const token = jwt.generateToken({ id: user._id });
                     res.header("Authorization", token).send(user);
            }catch(err){
                console.log(err);
                next(err);
            }
           
        },
        //POST VERIFY LOGIN
        verifyLogin: async (req, res, next) => {
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


                    if (['token expired', 'blacklisted token', 'jwt must be provided'].includes(err.message)) {
                        res.status(401).send({ message: 'UNAUTHORIZED!' });
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
            console.log('Password:', password);
            if (email === '' || password === '  ') {
                res.status(404).send({ message: 'An email and a password are required!' });
                return;
            }
            User.findOne({ email })
                .then((user) => Promise.all([user, user.passwordsMatch(password)]))
                .then(([user, match]) => {
                    if (!match) {
                        res.status(401).send({ message: 'Invalid credentials!' });
                        return;
                    }
                    const token = jwt.generateToken({ id: user._id });
                    console.log('User: ', user);
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
