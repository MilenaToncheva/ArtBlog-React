import React from 'react';
import styles from './btn.module.css';
const Btn=({title})=>{
    return(
        <button className={styles.btn}>{title}</button>
    );
}

export default Btn;