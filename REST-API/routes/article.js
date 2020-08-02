const router=require('express').Router();
const controller=require('../controllers/article');
const isAuth=require('../utils/isAuth');
const validations=require('../utils/validator');

router.get('/:_id',isAuth(false),controller.getArticleById);
router.get('/all', isAuth(false),controller.getAllArticles);



router.post('/create-article',isAuth(false),validations['article'],controller.createArticle);
router.put('/edit-article/:_id',isAuth(false),validations['article'],controller.editArticle);
router.delete('/delete-article/:_id',isAuth(false),validations['article'],controller.deleteArticle);


module.exports=router;