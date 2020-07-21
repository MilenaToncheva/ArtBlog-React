const router=require('express').Router();
const controller=require('../controllers/post');
const isAuth=require('../utils/isAuth');
const validations=require('../utils/validator');

router.get('/create-post',isAuth(),controller.get.createPost);
router.get('/details-post/:_id',isAuth(),controller.get.detailsPost);
router.get('/edit-post/:_id',isAuth(),controller.get.editPost);
router.get('/like-post/:_id',isAuth(),controller.get.likePost);
router.get('/delete-post/:_id',isAuth(),controller.get.deletePost);


router.post('/create-post',isAuth(),validations['post'],controller.post.createPost);
router.post('/edit-post/:_id',isAuth(),validations['post'],controller.post.editPost);


module.exports=router;