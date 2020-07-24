const Aricle = require("../../models/Article");
const { validationResult } = require('express-validator');
const User = require("../../models/User");
module.exports = {
    get: {
        getAllArticles: (req, res, next) => {
            Article.find()
                .populate('author')
                .then((articles) => res.send(articles))
                .catch(next)
        },
        getById: (req, res, next) => {
            const id = req.params.id;
            Article.findOne({ _id: id })
                .populate('author')
                .then((article) => res.send(article))
                .catch(next)
        
        }

    },
    post: {
     createArticle:async(req, res, next)=> {
            const { title, description, imageUrl } = req.body;
            console.log(req.body);

            const author = req.user._id;

            await Article.create({ title, description, imageUrl, isPublic: isPublicc, createdAt, creator });
            res.redirect('/home/');
        },
         editArticle:async(req, res, next) =>{
            console.log(req.body);
            const _id = req.params._id;
            const { title, description, imageUrl, isPublic: isChecked } = req.body;
            console.log('isChecked:', isChecked);
            const isPublicc = isChecked === 'on' ? true : false;
            console.log('isPublicc', isPublicc);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {

                return res.render('edit-article', {
                    isLoggedIn: req.user !== undefined,
                    username: req.user !== undefined ? req.user.username : '',
                    message: errors.array()[0].msg,
                    oldInput: { title, description, imageUrl, isPublic: isPublicc }
                })
            }

            await Article.updateOne({ _id }, { title, description, imageUrl, isPublic: isPublicc });
            res.redirect('/home/');
        }
    }

}