const Aricle = require("../../models/Article");
const { validationResult } = require('express-validator');
const User = require("../../models/User");
const Article = require("../../models/Article");
module.exports = {

    getAllArticles: (req, res, next) => {
        Article.find()
            .populate('author')
            .sort({ _id: -1 })
            .then(articles => res.send(articles))
            .catch(next);

    },
    getArticleById: (req, res, next) => {
        const id = req.params.id;
        Article.findOne({ _id: id })
            .populate('author')
            .then((article) => res.send(article))
            .catch(next);

    },



    createArticle: (req, res, next) => {
        const { title, description, imageUrl, authorName, author } = req.body;
        console.log("REST BODY:", req.body);
        console.log(author);

        Article.create({ title, description, imageUrl, authorName, author }).
            then((createdArticle) => {
                PromiseAll([
                    User.updateOne({ _id: author }, { $push: { articles: createdArticle } }),
                    Aricle.findOne({ _id: createdArticle._id })
                ]);
            })
            .then(([updatedUser, createdArticle]) => {
                console.log(createdArticle);
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

