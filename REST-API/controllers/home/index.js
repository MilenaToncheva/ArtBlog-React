const Article = require("../../models/Article");

module.exports = {
    get: (req, res, next) => {
        Article.find().populate('author')
            .then((articles) => res.send(articles))
            .catch(next);

    }
}

