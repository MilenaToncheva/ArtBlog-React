import React from 'react';
import PageLayout from '../../../components/core/page-layout/page-layout.js';
import ArticleForm from '../../../components/article-form/article-form.js';
const CreateArticlePage = () => {
       return (
        <PageLayout title="Create  Article">
           <ArticleForm btnTitle="Create" disabled={false}/>
        </PageLayout>
    )
}
export default CreateArticlePage;




