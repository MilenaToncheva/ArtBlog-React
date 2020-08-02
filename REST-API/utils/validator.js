const { body } = require('express-validator');

module.exports = {
    user: [
        body('email')
            .notEmpty()
            .withMessage('Invalid email!'),
        body('password')
            .isAlphanumeric()
            .withMessage('Password should contain only english letters and digits!')
            .isLength({ min: 3 })
            .withMessage('Password should be at least 3 symbols!')

    ],
    article: [
        body('title')
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage('Title should not be empty and at least 3 symbols long!'),

        body('description')
            .notEmpty()
            .withMessage('Description should not be empty')
            .isLength({ max: 100 })
            .isLength({ min: 20 })
            .withMessage('Description should be between 20 and 100 symbols!')
        ,
        body('imageUrl')
            .notEmpty()
            .withMessage('Image URL should not be an empty field!')


    ]
}

