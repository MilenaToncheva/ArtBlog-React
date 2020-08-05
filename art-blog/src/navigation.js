import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import styles from './navigation.module.css';
import PageLayout from './components/core/page-layout/page-layout';
import AuthContext from './Context.js';
import LoginPage from './pages/login/login';
import RegisterPage from './pages/register/register.js';
import CreateArticlePage from './pages/article/create/create-article.js'
import ErrorPage from './pages/error/error-page.js'
import HomePage from './pages/home/home';
import PublicHomePage from './pages/public-home/public-home';

class Navigation extends Component {

    static contextType = AuthContext;

    render() {
        const { isLoggedIn } = this.context;
        return (
            <Router>
                <Switch>
                        < Route exact path="/home/" >
                            {  isLoggedIn ? <HomePage/>:<PublicHomePage/>}
                        </Route>
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
                </Switch>
            </Router>
        )
    }

}

export default Navigation;