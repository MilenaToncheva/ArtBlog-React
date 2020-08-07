import React, { useContext,useState, useEffect,Fragment } from 'react';
import styles from './home.module.css'
import articleService from '../../services/article-serivce.js';
import PageLayout from '../../components/core/page-layout/page-layout';
import AuthContext from '../../Context.js';
import ArticleCard from '../../components/card/card.js';
import { MDBRow } from 'mdbreact';
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
    
      {articleCards.length>0 ?
        <Fragment>
          <MDBRow >
          {articleCards.map((articleCard) => 
          <div className={styles.card}>
 <ArticleCard className key={articleCard._id} id={articleCard._id} 
          title={articleCard.title} imageUrl={articleCard.imageUrl} >{articleCard.description}</ArticleCard> 
          </div>
         
        )}
          </MDBRow>
         
        </Fragment> :
        <div className={styles.noArticles}>No articles yet</div>}
    </PageLayout>

  );
}

export default HomePage;