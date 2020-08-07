
import React from 'react';
import {useHistory} from 'react-router-dom';
import { MDBRow,MDBBtn,MDBCol,MDBCard,MDBView,MDBCardImage,MDBCardBody,MDBIcon,MDBCardText,MDBCardTitle } from 'mdbreact';
import styles from './card.module.css';
const ArticleCard = ({ id, imageUrl, title,children }) => {
  const history=useHistory();
  console.log('id',id);
  return (
          <MDBCol md='12' className={styles.card} >
        <MDBCard narrow>
          <MDBView cascade>
            <MDBCardImage 
              hover
              overlay='white-slight'
              className={styles.cardImage}
              src={imageUrl}
              alt='article'
            />
          </MDBView>
          <MDBCardBody className={styles.body}>
            <h5 className='pink-text'>
              <MDBIcon icon='paint-brush' /> Art
            </h5>
            <MDBCardTitle className='font-weight-bold'>
              {title}
            </MDBCardTitle>
            <MDBCardText className={styles.description}>
             {children.substring(0,10)}...
            </MDBCardText>
            <MDBBtn className={styles.brn} color='unique' onClick={()=>{history.push(`/article/details-article/${id}`)}}>Details</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
  );
}
export default ArticleCard;