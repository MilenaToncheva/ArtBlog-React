import React, { useState, useEffect,useContext } from 'react';
import styles from './article.module.css';
import Conditional from '../Conditional.js';
import Btn from '../../components/btn/btn.js';
import Description from '../../components/description/description.js';
import AuthContext from '../../Context.js';

const Article = ({ pageTitle,title, description, imageUrl, articleId,authorId, authorName, disabled }) => {
    const context=useContext(AuthContext);
      console.log('UserId',context.user.id);
      console.log('AuthorId',authorId);
const isAuthor=JSON.stringify(context.user.id)===JSON.stringify(authorId);
console.log(articleId);

console.log('UserId',context.user.id);
console.log('isAuthor: ',isAuthor);
    const btnTitle = pageTitle.split(' ')[1];
    console.log(pageTitle);
    const clickHandler=()=>{
        
        //TODO
    }
    return (
        <div>
           <h1 className={styles.title}>{title}</h1>
            <div row>
                <div className="col-md-6 divImage">
                    <img classname={styles.imageArticle} src={imageUrl} />
                </div>
                <div className="col-md-6 divImage">
                    <Description disabled={disabled} description={description}/>
                    <div>
                        <p>Author: {authorName}</p>
                    </div>
                </div>
            </div>
            <Conditional if={btnTitle === 'Details'&& isAuthor} onClick={clickHandler}>
                <Btn title="Edit"/>
                <Btn title="Delete"/>
            </Conditional>
        </div>

    )
}
export default Article;