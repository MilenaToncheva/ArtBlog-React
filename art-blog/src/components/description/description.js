import React from 'react';
import styles from './description.module.css';

const Description = ({ disable, description }) => {
    return (
        <div>
            <span></span>
            <br />
            <textarea className={styles.description} rows="16" cols="80" disapled={disable} value={description} />
        </div>

    );


}
export default Description;