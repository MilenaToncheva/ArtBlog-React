import React, { useContext,useState, useEffect } from 'react';
import styles from './home.module.css'
import articleService from '../../services/article-serivce.js';
import PageLayout from '../../components/core/page-layout/page-layout';
import AuthContext from '../../Context.js';
import ArticleCard from '../../components/card/card.js';
const HomePage = () => {
const context=useContext(AuthContext);
  const [articleCards, setArticleCards] = useState([]);


  const getArticles=async()=>{
    const articles=await articleService.loadAll();
    setArticleCards(articles);
  }
  useEffect(()=>{
  getArticles();
  }, []);
  return (
    <PageLayout title="Welcome to MT ArtBlog">
    
      {articleCards ?
        <div className="welcome">
          {articleCards.map((articleCard) => 
            <ArticleCard key={articleCard._id} id={articleCard._id} 
            title={articleCard.title} imageUrl={articleCard.imageUrl} >{articleCard.description}</ArticleCard> 
          )}
        </div> :
        <div className={styles.noArticles}>No articles yet</div>}
    </PageLayout>

  );
}

export default HomePage;