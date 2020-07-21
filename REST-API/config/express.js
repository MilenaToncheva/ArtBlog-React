const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');

const {path}=require('path');


module.exports=(app)=>{
    app.use(cors());
    app.use(express.json());
    
   
  
    app.use(cookieParser());
    app.use(express.urlencoded({extended:false}));

  
}