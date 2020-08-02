import React from 'react';
import Navbar from '../navbar/navbar.js';
import Footer from '../footer/footer.js';
import styles from './page-layout.module.css';
import Title from '../title/title.js';
const PageLayout = ({ children,title }) => {

    return (
        <div className={styles.backgroundImg}  >
            <Navbar />
            <Title title={title}/>
            {children}
            <Footer />
        </div>
    );
}

export default PageLayout;