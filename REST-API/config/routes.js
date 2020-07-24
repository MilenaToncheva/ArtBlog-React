const router=require('../routes');

module.exports=(app)=>{
app.use('/home', router.home);
app.use('/user',router.user);
app.use('/article',router.article);
app.use('*',(req,res,next)=>{
    res.send('<h1>404 - NOT FOUND!</h1>')
})
}