const router=require('express').Router();
const controller=require('../controllers/article');
const isAuth=require('../utils/isAuth');
const validations=require('../utils/validator');

router.get('/:_id',isAuth(),controller.get.getById);
router.get('/all', isAuth(),controller.get.getAllArticles);



router.post('/create-article',isAuth(),validations['article'],controller.post.createArticle);
router.post('/edit-article/:_id',isAuth(),validations['article'],controller.post.editArticle);


module.exports=router;