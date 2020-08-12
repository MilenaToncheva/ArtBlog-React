const mongoose=require('mongoose');
const{Schema,model:Model}=mongoose;
const{String,Number,ObjectId,Boolean}=Schema.Types;

const ArticleSchema=new Schema({
    title:{
        type:String,
        required:[true,'Please enter the title!'],
        unique:true
    },
    description:{
        type:String,
        required:[true,'Please enter description!'],
        maxlength :[1000,'Description should be 1000 symbols max!'],
        minlength:[20,'Description should be at least 20 symbols!']
    },
    imageUrl:{
        type:String,
        required:[true, 'Image URL is required!']
    },
    
    author:{
        type:ObjectId,
        ref:'User'
    },
    authorName:{
        type:String,
        minlength:[3,"Author's name should be at least 3 symbols!"]
    }

})

module.exports=new Model('Article', ArticleSchema);