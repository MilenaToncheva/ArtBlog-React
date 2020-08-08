const Article = require("../../models/Article");
const { validationResult } = require('express-validator');
const User = require("../../models/User");


module.exports = {

    getAllArticles: (req, res, next) => {
        Article.find()
            .sort({ _id: -1 })
            .populate('author')
            .lean()
            .then((articles) => {
                res.send(articles);
            })
            .catch(next);

    },
    getArticleById: (req, res, next) => {
        const id = req.params._id;
        Article.findOne({ _id: id })
            .populate('author')
            .then((article) => res.send(article))
            .catch(next);

    },
    getMyArticles: (req, res, next) => {
        const userId = req.user._id;
        console.log('UserId-in controller',userId);
        Article.find({ author: userId })
            .lean()
            .then((articles) => res.send(articles))
            .catch(next);
    },

    createArticle: (req, res, next) => {

        const { title, description, imageUrl, authorName } = req.body;
        //console.log('Body-create-article: ',req.body);
        //console.log('user-from-requerst: ',req.user)
        const { _id } = req.user._id;
        Article.create({ title, description, imageUrl, authorName, author: _id }).
            then((createdArticle) => {
                Promise.all([
                    User.updateOne({ _id }, { $push: { articles: createdArticle._id } }),
                    Article.findOne({ _id: createdArticle._id })
                ]);
            })
            .then(([updatedUser, createdArticle]) => {
                console.log(updatedUser);
                res.send(createdArticle)

            }).catch(next);

    },

    editArticle: async (req, res, next) => {
        console.log(req.body);
        const _id = req.params._id;
        const { title, description, imageUrl, authorName } = req.body;

        Article.updateOne({ _id }, { title, description, imageUrl, authorName })
            .then(updatedArticle => res.send(updatedArticle))
            .catch(next);

    },
    deleteArticle: (req, res, next) => {
        const _id = req.params._id;
        Article.delete({ _id })
            .then((deletedArticle) => res.send(deletedArticle))
            .catch(next);
    }
}

