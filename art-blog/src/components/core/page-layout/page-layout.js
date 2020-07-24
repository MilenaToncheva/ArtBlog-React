import React from 'react';
import Navbar from '../navbar/navbar.js';
import Footer from '../footer/footer.js';
import styles from './page-layout.module.css';
const PageLayout = (props) => {

    return (
       
             <div className={styles.backgroundImg}  >
            <Navbar />
           
                {props.children}
          
            <Footer />
            </div>
        );
}

export default PageLayout;