const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');

const {path}=require('path');


module.exports=(app)=>{
    app.use(cors({
        exposedHeaders: 'Authorization',
        origin: 'http://localhost:3000',
        credentials: true
      }));
    app.use(express.json());
    
   
  
    app.use(cookieParser());
    app.use(express.urlencoded({extended:false}));

  
}