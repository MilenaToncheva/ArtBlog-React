import React, { useState, useEffect } from 'react';
import styles from './home.module.css'
import articleService from '../../services/article-serivce.js';
import PageLayout from '../../components/core/page-layout/page-layout';
import AuthContext from '../../Context.js';
import ArticleCard from '../../components/card/card.js';
const HomePage = () => {

  const [articleCards, setArticleCards] = useState(null);
  useEffect(() => {
    articleService.loadAll().then(articles =>
      setArticleCards(articles));
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
        <div>No articles yet</div>}
    </PageLayout>

  );
}

export default HomePage;