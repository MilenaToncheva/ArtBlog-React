import React from 'react';

import styles from './error-page.module.css';
import PageLayout from '../../components/core/page-layout/page-layout.js'
const ErrorPage = () => {
    return (
        <PageLayout title="Error Page">
            <div>
                <h1 className={styles.notFound}>Something went wrong! Please check and try again!</h1>
            </div>
        </PageLayout>
    )
}

export default ErrorPage;