import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './details-article.module.css';
import PageLayout from '../../../components/core/page-layout/page-layout.js';
import Article from '../../../components/article/article.js';
import articleService from '../../../services/article-serivce.js';
const DetailsArticlePage = () => {
    const params = useParams();
    const [article, setArticle] = useState({});
    const id = params.id;
    console.log(id);

    const getArticleById = async (id) => {
        const article = await articleService.load(id);
        setArticle(article);
       
    }

    useEffect(() => {
        getArticleById(id);
    }, [id])

    return (
        <PageLayout title="Article Details">
            <Article className={styles.article}title={article.title} description={article.description} imageUrl={article.imageUrl}
                articleId={id} authorName={article.authorName} authorId={article.author} disabled={true} pageTitle={'Article Details'} />
        </PageLayout>
    );
}

export default DetailsArticlePage;