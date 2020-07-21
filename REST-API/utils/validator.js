const { body } = require('express-validator');

module.exports = {
    user:[
        body('username')
        .isAlphanumeric()
        .withMessage('Username should contain only english letters and digits!')
        .isLength({min:3})
        .withMessage('Username should be at least 3 symbols!'),
       
        body('password')
        .isAlphanumeric()
        .withMessage('Password should contain only english letters and digits!')
        .isLength({min:3})
        .withMessage('Password should be at least 3 symbols!')
        
    ],
    post:[
        body('title')
        .notEmpty()
        .withMessage('Title should not be empty!'),
        
    body('description')
    .notEmpty()
    .withMessage('Description should not be empty')
    .isLength({max:50})
    .withMessage('Description should bo 50 symbols at maximum!')
    ,
    body('imageUrl')
    .notEmpty()
    .withMessage('Image URL should not be an empty field!')
           
    
    ]
}

