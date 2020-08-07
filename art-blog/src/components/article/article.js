import React, { useState, useEffect,useContext } from 'react';
import styles from './article.module.css';
import Conditional from '../Conditional.js';
import Btn from '../../components/btn/btn.js';
import Description from '../../components/description/description.js';
import AuthContext from '../../Context.js';

const Article = ({ pageTitle,title, description, imageUrl, articleId,authorId, authorName, disabled }) => {
    const context=useContext(AuthContext);
    console.log('Context',context);
const isAuthor=context.user.id===authorId;
    const btnTitle = pageTitle.split(' ')[1];
    console.log(pageTitle);
    const clickHandler=()=>{
        
        //TODO
    }
    return (
        <div>
           <h1 className={styles.title}>{title}</h1>
            <div row>
                <div className="col-md-6 page">
                    <img classname={styles.imageArticle} src={imageUrl} />
                </div>
                <div className="col-md-6 page">
                    <Description disabled={disabled} description={description}/>
                    <div>
                        <p>Author: {authorName}</p>
                    </div>
                </div>
            </div>
            <Conditional if={btnTitle !== 'Details'&& isAuthor} onClick={clickHandler}>
                <Btn title={btnTitle}/>
            </Conditional>
        </div>

    )
}
export default Article;