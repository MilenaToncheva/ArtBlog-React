import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styles from './navigation.module.css';
import PageLayout from './components/core/page-layout/page-layout';
import AuthContext from './Context.js';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register.js';
import CreateArticlePage from './pages/article/create/create-article.js'
import ErrorPage from './pages/error/error-page.js'

class Navigation extends Component {

    static contextType = AuthContext;

    render() {
        const { isLoggedIn } = this.context;
        return (
            <Router>
                <Switch>
                    <Suspense fallback={
                        <PageLayout><p className={styles.loading}>Loading...</p></PageLayout>}>

                        < Route exact path="/home/" 
                             component={React.lazy(() => (
                            isLoggedIn ?
                                import('./pages/home/home.js') :
                                import('./pages/public-home/public-home.js')))}
                        />

                        <Route exact path="/user/register">
                            {   !isLoggedIn ? <RegisterPage />:<Redirect to='/home/'/>}
                           </Route>
                        <Route exact path="/user/login" >
                            { !isLoggedIn ? <LoginPage/>:<Redirect to="/home/"/>}
                        </Route>
                          
                            
                        <Route exact path="/article/create-article">
                            {  isLoggedIn? <CreateArticlePage/>:<Redirect to="/user/login"/>}
                            </Route> 

                        <Route component={ErrorPage} />

                    </Suspense>

                </Switch>
            </Router>
        )
    }

}

export default Navigation;