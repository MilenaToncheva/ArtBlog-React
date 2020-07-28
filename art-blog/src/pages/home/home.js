import React,{Component} from 'react';
import styles from './home.module.css'

import PageLayout from '../../components/core/page-layout/page-layout';
import AuthContext from '../../Context.js';
class HomePage extends Component {
  static contextType=AuthContext;
  render(){
    
  return (
    <PageLayout>
      <div className={styles.welcome}>
        <h1 className="h1 py-5 font-weight-bold">Welcome to MT ArtBlog</h1>
        <p className="px-5 mb-5 pb-3 lead black-text">
          Logged in user home page
        </p>
      </div>
    </PageLayout>

  );
}
}
export default HomePage;