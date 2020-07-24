import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import styles from './navigation.module.css';
import PageLayout from './components/core/page-layout/page-layout';
const Navigation=()=>{
    const isLoggedIn=false;  //TODO
    return (
        <Router>
            <Switch>
                <Suspense fallback={
                <PageLayout><p className={styles.loading}>Loading...</p></PageLayout>}>
                   
                <Route path="/" exact component ={React.lazy(()=>(isLoggedIn ?
                                                 import('./pages/home/home.js') :
                                                 import('./pages/public-home/public-home.js')))}/>
                
                <Route path="/user/register"component={React.lazy(()=>import('./pages/register/register.js'))}/>
                <Route path="/user/login"component={React.lazy(()=>import('./pages/login/login.js'))}/>
                <Route path="/article/create" component={React.lazy(()=>import('./pages/article/create/create-article.js'))}/>
                </Suspense>
              
            </Switch>
        </Router>
    )
}

export default Navigation;