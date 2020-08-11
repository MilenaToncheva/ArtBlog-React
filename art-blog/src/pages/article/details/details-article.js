import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './details-article.module.css';
import PageLayout from '../../../components/core/page-layout/page-layout.js';
import Article from '../../../components/article/article.js';
import articleService from '../../../services/article-serivce.js';
const DetailsArticlePage = () => {

    const params = useParams();
    const [article, setArticle] = useState({});
    const [authorId, setAuthorId] = useState({});
    const id = params.id;
    console.log(id);

    const getArticleById = async (id) => {
        const article = await articleService.load(id);
        setArticle(article);
        setAuthorId(article.author._id);
        console.log('Article', article);
    }

    useEffect(() => {
        getArticleById(id);
        return () => { }
    }, [])



    return (
        <PageLayout title="Article Details">
            <Article className={styles.article} title={article.title} description={article.description} imageUrl={article.imageUrl}
                articleId={article._id} authorName={article.authorName} authorId={authorId} disabled={true} pageTitle={'Article Details'} />
        </PageLayout>
    );
}

export default DetailsArticlePage;