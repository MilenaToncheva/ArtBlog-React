import React, { useContext, Fragment } from 'react';
import { useHistory,Link } from 'react-router-dom';
import styles from './article.module.css';
import Description from '../../components/description/description.js';
import AuthContext from '../../Context.js';


const Article = ({ pageTitle, title, description, imageUrl, articleId, authorId, authorName, disabled }) => {
    const history = useHistory();
    const context = useContext(AuthContext);
    const isAuthor = JSON.stringify(context.user.id) === JSON.stringify(authorId);
    const btnTitle = pageTitle.split(' ')[1];

    console.log('ArticleId: ', articleId);


    return (
        <div>
            <h1 className={styles.title}>{title}</h1>


            <div className="row">
                <div className="column">
                    <img className="image" src={imageUrl} />
                </div>
                <div className="column">
                <Link to={`/user/profile/${authorId}`}>Author: {authorName}</Link>
                    <Description disabled={disabled} description={description} />
                    
                </div>
            </div>
            {isAuthor ?
                <div id="btnDiv" className="btns">
                    <Link className={styles.btn} to={`/article/edit-article/${articleId}`}>Edit</Link>
                    <Link className={styles.btn} to={`/article/delete-article/${articleId}`}>Delete</Link>
                </div> : null}



        </div>

    )
}
export default Article;