
import React from 'react';
import { MDBRow,MDBBtn,MDBCol,MDBCard,MDBView,MDBCardImage,MDBCardBody,MDBIcon,MDBCardText,MDBCardTitle } from 'mdbreact';
const ArticleCard = ({ _id, imageUrl, title,children }) => {
  return (
    <MDBRow>

      <MDBCol md='4'>
        <MDBCard narrow>
          <MDBView cascade>
            <MDBCardImage
              hover
              overlay='white-slight'
              className='card-img-top'
              src={imageUrl}
              alt='article'
            />
          </MDBView>

          <MDBCardBody>
            <h5 className='pink-text'>
              <MDBIcon icon='paint-brush' /> Art
            </h5>

            <MDBCardTitle className='font-weight-bold'>
              {title}
            </MDBCardTitle>

            <MDBCardText>
             {children}...
            </MDBCardText>

            <MDBBtn color='unique' >Details</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>

    </MDBRow>

  );
}
export default ArticleCard;