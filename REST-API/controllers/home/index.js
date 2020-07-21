const Post = require("../../models/Post");

module.exports = {
    get: (req, res, next) => {
        Post.find().populate('author')
            .then((posts) => res.send(posts))
            .catch(next);

    }
}

