const Post = require("../../models/Post");
const { validationResult } = require('express-validator');
const User = require("../../models/User");
module.exports = {
    get: {
        getAllPosts: (req, res, next) => {
            Post.find()
                .populate('author')
                .then((posts) => res.send(posts))
                .catch(next)
        },
        getById: (req, res, next) => {
            const id = req.params.id;
            Post.findOne({ _id: id })
                .populate('author')
                .then((post) => res.send(post))
                .catch(next)
        
        },


    },
    post: {
     createPost:(req, res, next)=> {
            const { title, description, imageUrl } = req.body;
            console.log(req.body);

            const author = req.user._id;

            await Post.create({ title, description, imageUrl, isPublic: isPublicc, createdAt, creator });
            res.redirect('/home/');
        },
        async editPost(req, res, next) {
            console.log(req.body);
            const _id = req.params._id;
            const { title, description, imageUrl, isPublic: isChecked } = req.body;
            console.log('isChecked:', isChecked);
            const isPublicc = isChecked === 'on' ? true : false;
            console.log('isPublicc', isPublicc);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.render('edit-post', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user !== undefined ? req.user.username : '',
                    message: errors.array()[0].msg,
                    oldInput: { title, description, imageUrl, isPublic: isPublicc }
                })
            }

            await Post.updateOne({ _id }, { title, description, imageUrl, isPublic: isPublicc });
            res.redirect('/home/');
        }
    }

}