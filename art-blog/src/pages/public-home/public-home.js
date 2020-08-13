import React from 'react';
import styles from './public-home.module.css'
import { Link } from 'react-router-dom';
import PageLayout from '../../components/core/page-layout/page-layout.js';

const PublicHomePage = () => {

  return (
    <PageLayout title="Welcome to MT ArtBlog">
      <div className={styles.welcome}>
        <p className="px-5 mb-5 pb-3 lead black-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam.
          </p>
        <p className={styles.text}> Please <Link className={styles.link} to="/user/login">login</Link> to gain access to our articles</p>
        <p className={styles.text}>If you don't have an account, <Link className={styles.link} to="/user/register">click</Link> here to Register</p>
      </div>
    </PageLayout>
  );
}

export default PublicHomePage;