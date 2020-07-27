const router=require('express').Router();
const controller=require('../controllers/user');

const validations=require('../utils/validator');//todo

router.get('/',controller.get);

router.post('/register', controller.post.register);
router.post('/login',controller.post.login);
router.post('/logout',controller.post.logout);
router.post('/verify',controller.post.verifyLogin);
router.put('/',controller.put);
router.delete('/',controller.delete);

module.exports=router;