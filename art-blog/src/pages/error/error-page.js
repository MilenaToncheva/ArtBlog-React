import React from 'react';
import {useHistory} from 'react-router-dom';
import styles from './error-page.module.css';
import PageLayout from '../../components/core/page-layout/page-layout.js'
const ErrorPage=(props)=> {

   const history=useHistory();

   let message='Invalid input!';
   if(props.location.state){
       message=props.location.state.message;
   }
        return (
            <PageLayout title="Error Page">

                <h1 className={styles.errPage}>Something went wrong! Please check and  try again!</h1>
                <h1 className={styles.errPage}>Error: {message}</h1>
              <div className={styles.divBtn}>
              <button  className={styles.btn} onClick={()=>history.goBack()} >Go back</button>
                  </div> 
            </PageLayout>
        )
    }

export default ErrorPage;