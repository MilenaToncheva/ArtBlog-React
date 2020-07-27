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
        maxLength:[100,'Description should be 100 symbols max!'],
        minlength:[20,'Description should be at least 20 symbols!']
    },
    imageUrl:{
        type:String,
        required:[true, 'Image URL is required!']
    },
    
    author:{
        type:ObjectId,
        ref:'User'
    }

})

module.exports=new Model('Article', ArticleSchema);