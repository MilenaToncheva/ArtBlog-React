const mongoose=require('mongoose');
const{Schema,model:Model}=mongoose;
const{String,Number,ObjectId,Boolean}=Schema.Types;

const PostSchema=new Schema({
    title:{
        type:String,
        required:[true,'Please enter the title!'],
        unique:true
    },
    description:{
        type:String,
        required:[true,'Please enter description!'],
        maxLength:[50,'Description should be 50 symbols max!']
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

module.exports=new Model('Post', PostSchema);