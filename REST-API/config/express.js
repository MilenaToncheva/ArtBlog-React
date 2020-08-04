const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const secret='secret';
const {path}=require('path');


module.exports=(app)=>{
    app.use(cors({
        exposedHeaders: 'Authorization',
        origin: 'http://localhost:3000',
        
      }));
    app.use(express.json());
    
    app.use(express.urlencoded({extended:false}));
  
    app.use(cookieParser(secret));
    

  
}