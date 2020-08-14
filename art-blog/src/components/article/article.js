import React, { useContext} from 'react';
import {  Link } from 'react-router-dom';
import styles from './article.module.css';
import Description from '../../components/description/description.js';
import AuthContext from '../../Context.js';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';

const Article = ({ pageTitle, title, description, imageUrl, articleId, authorId, authorName, disabled }) => {
    const context = useContext(AuthContext);
    const isAuthor = JSON.stringify(context.user.id) === JSON.stringify(authorId);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{title}</h1>

            <MDBContainer className={styles.content}>
                <MDBRow>
                    <MDBCol md="6" className={styles.imageCol}>
                        <div className={styles.imageDiv}>
                            <img className={styles.image} src={imageUrl} alt="art" />
                        </div>
                    </MDBCol>
                    <MDBCol md="6" className={styles.infoCol}>
                        <Description className={styles.description} disabled={disabled} description={description} />
                        <Link className={styles.authorLink} to={`/user/profile/${authorId}`}>Author: {authorName}</Link>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            {isAuthor ?
                <div className="btns">
                    <div className={styles.links}>
                       <span><Link className={styles.btn} to={`/article/edit-article/${articleId}`}>EDIT</Link></span> 
                       <span> <Link className={styles.btn} to={`/article/delete-article/${articleId}`}>DELETE</Link></span>
                    </div>
                </div> : null}
        </div>
    )
}
export default Article;