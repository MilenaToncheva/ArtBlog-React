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
        Article.find({ author: userId })
            .lean()
            .then((articles) => res.send(articles))
            .catch(next);
    },

    createArticle: async (req, res, next) => {

        //const { title, description, imageUrl, authorName } = req.body;
        //
        //const { _id } = req.user._id;
        //Article.create({ title, description, imageUrl, authorName, author: _id }).
        //    then((createdArticle) => {
        //        Promise.all([
        //            User.updateOne({ _id }, { $push: { articles: createdArticle._id } }),
        //            Article.findOne({ _id: createdArticle._id })
        //        ]);
        //    })
        //    .then(([updatedUser, createdArticle]) => {
        //        res.send(createdArticle)
        //    }).catch(next);
        try {
            const { title, description, imageUrl, authorName } = req.body;
            const { _id } = req.user._id;
            const articleDb = await Article.findOne({ title });
            if (articleDb) {
                res.status(409).send({ message: `Title ${title} already exists! Please try a new one!` })
                return;
            }
           const createdArticle= await Article.create({ title, description, imageUrl, authorName, author: _id });
            await User.updateOne({ _id }, { $push: { articles: createdArticle._id } });
            const article=await Article.findOne({ _id: createdArticle._id });
            res.send(article);
        } catch (err) {
            console.log(err);
            next(err);
        }

    },

    editArticle: async (req, res, next) => {
        const _id = req.params._id;
        const { title, description, imageUrl, authorName } = req.body;

        Article.updateOne({ _id }, { title, description, imageUrl, authorName })
            .then(updatedArticle => res.send(updatedArticle))
            .catch(next);
    },

    deleteArticle: (req, res, next) => {
        const _id = req.params._id;
        console.log('I am in delete');
        Article.findByIdAndDelete(_id)
            .then((deletedArticle) => {
                console.log('deleted:', deletedArticle);
                res.send(deletedArticle);
            })
            .catch(next);
    }
}

