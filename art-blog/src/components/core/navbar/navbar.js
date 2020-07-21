import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
//import styles from '../footer/footer.module.css';
class Navbar extends Component {

render() {
  return (
    <Router>
      <MDBNavbar color="rgba(255, 152, 0, 0.3) rgba-orange-light" fixed-bottom dark expand="md" >
        <MDBNavbarBrand>
          <strong className="black-text">ArtBlog</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink className="black-text" to="#!">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="black-text" to="#!">My Articles</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="black-text" to="#!">Create Article</MDBNavLink>
            </MDBNavItem>
            
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light black-text" to="#!">
               Register
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light black-text" to="#!">
               Login
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
            <MDBNavLink className="waves-effect waves-light black-text" to="#!">
               <p>Welcome, MT</p>
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
            <MDBNavLink className="waves-effect waves-light black-text" to="#!">
               Logout
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        
      </MDBNavbar>
    </Router>
    );
  }
}

export default Navbar;