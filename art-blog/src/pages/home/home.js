import React from 'react';
import PageLayout from '../../components/core/page-layout/page-layout';
import Articles from '../../components/articles/articles.js';
const HomePage = () => {
  return (
    <PageLayout title="Welcome to MT ArtBlog">
    <Articles myArticles={false}/>
    </PageLayout>

  );
}

export default HomePage;