const router=require('express').Router();
const controller=require('../controllers/article');
const isAuth=require('../utils/isAuth');
const validations=require('../utils/validator');

router.get('/all',isAuth(),controller.getAllArticles);
router.get('/details-article/:_id',isAuth(),controller.getArticleById);


router.post('/create-article',isAuth(),validations['article'],controller.createArticle);
router.put('/edit-article/:_id',isAuth(),validations['article'],controller.editArticle);
router.delete('/delete-article/:_id',isAuth(),validations['article'],controller.deleteArticle);


module.exports=router;