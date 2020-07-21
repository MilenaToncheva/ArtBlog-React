
import React from 'react';
import {  MDBContainer, MDBFooter } from 'mdbreact';

const Footer = () => {
  return (
    <MDBFooter  color="rgba(255, 152 ) rgba-orange-light" className="font-small mt-3 fixed-bottom">
      <div className="footer-copyright text-center py-3 black-text">
        <MDBContainer fluid>
        &copy; 2020 Copyright MT
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;
