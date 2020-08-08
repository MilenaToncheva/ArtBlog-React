import React from 'react';
import PageLayout from '../../../components/core/page-layout/page-layout';
import Articles from '../../../components/articles/articles.js'
const MyArticlesPage=()=>{
return(
    <PageLayout title="My Articles">
<Articles myArticles={true}/>
    </PageLayout>
)
}

export default MyArticlesPage;