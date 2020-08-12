import React, { Component } from 'react';

import styles from './error-page.module.css';
import PageLayout from '../../components/core/page-layout/page-layout.js'
class ErrorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: props.location.error,
            errorInfo: props.location.errorInfo
        }
    }

    render() {

        return (
            <PageLayout title="Error Page">

                <h1 className={styles.notFound}>Something went wrong! Please check and try again!</h1>
                <h1>{this.state.error}</h1>
                <h1>{this.state.errorInfo}</h1>
            </PageLayout>
        )
    }
}
export default ErrorPage;