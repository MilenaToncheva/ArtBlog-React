import React from 'react';
import styles from './description.module.css';

const Description = ({ disable, description }) => {
    return (
        <div>
            <span>Description:</span>
            <br />
            <textarea className={styles.description} rows="15" cols="50" disapled={disable} value={description} />
        </div>

    );


}
export default Description;