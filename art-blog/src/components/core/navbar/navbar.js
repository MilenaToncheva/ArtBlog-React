import React, { Component, Fragment } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBLink, MDBNavbarToggler } from "mdbreact";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import styles from './navbar.module.css';
import AuthContext from '../../../Context.js';

class Navbar extends Component {
  constructor(props) {
    super(props);

  }
  static contextType = AuthContext;
logout=()=>{
  this.context.logOut();
 // this.props.history.push('/'); //todo ???????????????????
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