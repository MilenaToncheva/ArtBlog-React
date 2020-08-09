import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import PageLayout from '../../../components/core/page-layout/page-layout.js';
import ArticleForm from '../../../components/article-form/article-form.js';
import articleService from '../../../services/article-serivce.js';
const EditArticlePage = () => {
    const params=useParams();
    const id=params.id;
const[article,setArticle]=useState({});

const loadArticle=async(id)=>{
   const articleDb=await articleService.load(id);
   setArticle(articleDb);
   console.log('ArticleDb',articleDb)
}
useEffect(()=>{
  loadArticle(id);
   
},[id]);

       return (
        <PageLayout title="Article Edit">
           <ArticleForm btnTitle="Edit" disabled={false} articleId={id} 
           titleDb={article.title} descriptionDb={article.description} imageUrlDb={article.imageUrl}
            authorNameDb={article.authorName}/>
        </PageLayout>
    )
}
export default EditArticlePage;




