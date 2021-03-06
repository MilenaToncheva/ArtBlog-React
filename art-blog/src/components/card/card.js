
import React from 'react';
import { useHistory } from 'react-router-dom';
import { MDBBtn, MDBCol, MDBCard, MDBView, MDBCardImage, MDBCardBody, MDBIcon, MDBCardText, MDBCardTitle } from 'mdbreact';
import styles from './card.module.css';
const ArticleCard = ({ id, imageUrl, title, children }) => {
  const history = useHistory();
  
  return (
    <MDBCol md='12' className={styles.card} >
      <MDBCard style={{ width: "22rem" }}>
        <MDBView   cascade>
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
            <MDBIcon className={styles.icon} icon='paint-brush' /> Art
            </h5>
          <MDBCardTitle className={styles.title}>
            {title}
          </MDBCardTitle>
          <MDBCardText className={styles.description}>
            {children.substring(0, 10)}...
            </MDBCardText>
          <MDBBtn className={styles.brn} color='unique' onClick={() => { history.push(`/article/details-article/${id}`) }}>Details</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  );
}
export default ArticleCard;