import React, { Component, Fragment } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,  MDBNavbarToggler } from "mdbreact";
import { Link }from 'react-router-dom';
import styles from './navbar.module.css';
import AuthContext from '../../../Context.js';

class Navbar extends Component{
  static contextType = AuthContext;
logout=()=>{
  this.context.logOut();
 
}
  render() {
    const { isLoggedIn, user } = this.context;
   // console.log('IsLoggedIN: ', isLoggedIn);
   // console.log('user: ', user);
    return (

      <MDBNavbar className={styles.navbar} light expand="md" >
        <MDBNavbarBrand>
          <strong className="black-text">ArtBlog</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />

        <MDBNavbarNav left>
          <MDBNavItem className={styles.item}>
            <Link className="black-text" exact to="/">Home</Link>
          </MDBNavItem>
          {isLoggedIn ? (<Fragment>
            <MDBNavItem className={styles.item}>
              <Link className="black-text" to="/article/my-articles">My Articles</Link>
            </MDBNavItem>
            <MDBNavItem className={styles.item}>
              <Link className="black-text" to="/article/create">Create Article</Link>
            </MDBNavItem>
          </Fragment>) : null}
        </MDBNavbarNav>
        <MDBNavbarNav right>
          {!isLoggedIn ? (<Fragment>
            <MDBNavItem className={styles.item}>
              <Link className="waves-effect waves-light black-text" to="/user/register">
                Register
              </Link>
            </MDBNavItem>
            <MDBNavItem className={styles.item}>
              <Link className="waves-effect waves-light black-text padding-top:20px" to="/user/login">
                Login
              </Link>
            </MDBNavItem>
          </Fragment>) : null}
          {isLoggedIn ? (<Fragment>
            <MDBNavItem className={styles.item}>
              <Link className="waves-effect waves-light black-text" to="/user/profile/:id">
          <p>Welcome, {user.email}</p>
              </Link>
            </MDBNavItem>
            <MDBNavItem className={styles.item}>
              <Link  className="waves-effect waves-light black-text" to="/" onClick={this.logout}>
                Logout
              </Link>
            </MDBNavItem>
          </Fragment>) : null}

        </MDBNavbarNav>

      </MDBNavbar>

    );
  }
}

export default Navbar;