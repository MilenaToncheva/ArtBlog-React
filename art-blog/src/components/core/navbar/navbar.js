import React, { Fragment, useContext } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem } from "mdbreact";
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';
import AuthContext from '../../../Context.js';

const Navbar = () => {

  const context = useContext(AuthContext);
 
const  logout = () => {
    context.logOut();
    
  }
  return (

    <MDBNavbar className={styles.navbar} light expand="md" >
      <MDBNavbarBrand>
        <strong className="black-text">ArtBlog</strong>
      </MDBNavbarBrand>
     

      <MDBNavbarNav left>
        <MDBNavItem className={styles.item}>
          <Link className="black-text" exact to="/home/">Home</Link>
        </MDBNavItem>
        {context.isLoggedIn ? (<Fragment>
          <MDBNavItem className={styles.item}>
            <Link className="black-text" to="/article/my-articles">My Articles</Link>
          </MDBNavItem>
          <MDBNavItem className={styles.item}>
            <Link className="black-text" to="/article/create-article">Create Article</Link>
          </MDBNavItem>
        </Fragment>) : null}
      </MDBNavbarNav>
      <MDBNavbarNav right>
        {!context.isLoggedIn ? (<Fragment>
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
        {context.isLoggedIn ? (<Fragment>
          <MDBNavItem className={styles.item}>
            <Link className="waves-effect waves-light black-text" to={`/user/profile/${context.user.id}`}>
              <p>Welcome, {context.user.email}</p>
            </Link>
          </MDBNavItem>
          <MDBNavItem className={styles.item}>
            <Link className="waves-effect waves-light black-text" to="/home/" onClick={logout}>
              Logout
              </Link>
          </MDBNavItem>
        </Fragment>) : null}

      </MDBNavbarNav>

    </MDBNavbar>

  );
}


export default Navbar;