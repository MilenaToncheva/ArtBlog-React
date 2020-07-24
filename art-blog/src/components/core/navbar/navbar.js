import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem,MDBLink, MDBNavbarToggler } from "mdbreact";
import { BrowserRouter as Router,Link } from 'react-router-dom';
import styles from './navbar.module.css';
class Navbar extends Component {

render() {
  return (
    
      <MDBNavbar className={styles.navbar} light expand="md" >
        <MDBNavbarBrand>
          <strong className="black-text">ArtBlog</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        
          <MDBNavbarNav left>
            <MDBNavItem className={styles.item}>
              <Link className="black-text"  exact to="/">Home</Link>
            </MDBNavItem>
            <MDBNavItem className={styles.item}>
              <Link className="black-text" to="/article/my-articles">My Articles</Link>
            </MDBNavItem>
            <MDBNavItem className={styles.item}>
              <Link className="black-text" to="/article/create">Create Article</Link>
            </MDBNavItem>
            
          </MDBNavbarNav>
          <MDBNavbarNav right>
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
            <MDBNavItem className={styles.item}>
            <Link className="waves-effect waves-light black-text" to="/user/profile/:id">
               <p>Welcome, MT</p>
              </Link>
            </MDBNavItem>
            <MDBNavItem className={styles.item}>
            <Link className="waves-effect waves-light black-text" to="#!">
               Logout
              </Link>
            </MDBNavItem>
          </MDBNavbarNav>
        
      </MDBNavbar>
    
    );
  }
}

export default Navbar;