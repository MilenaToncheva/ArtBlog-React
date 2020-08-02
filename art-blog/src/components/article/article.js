import React, { useState, useEffect } from 'react';
import styles from './article.module.css';
import Title from '../core/title/title.js';
import Canditional from '../Conditional.js';
const Article = ({ title, description, imageUrl, articleId, authorName, disabled }) => {

    const btnTitle = title.split(' ')[1];
    return (
        <div>
           
            <div row>
                <div className="col-md-6">
                    <img classname={styles.image} src={imageUrl} />
                </div>
                <div className="col-md-6">
                    <Description disabled={disabled}>{description}</Description>
                    <div>
                        <p>Author: {authorName}</p>
                    </div>
                </div>
            </div>
            <Conditional if={btnTitle !== 'Details'} onClick={changeHandler}>
                <Btn className={styles.btn}>{btnTitle}</Btn>
            </Conditional>
        </div>

    )
}
export default Article