import React from 'react';
import styles from '../home/home.module.css'

const Home=()=>{
    return (

        <div  className={styles.backgroundImg} id="start"  >
          
     <div className="welcome">
     <h1 class="h1 py-5 font-weight-bold">Welcome to MT ArtBlog</h1>
       
       <p class="px-5 mb-5 pb-3 lead black-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
         eiusmod
         tempor incididunt ut labore et dolore magna aliqua.
         Ut enim ad minim veniam.</p>
   <p> Please <a href="/user/login">login</a> to gain access to our articles</p>
   <p>If you don't have an account, <a href="/user/register">click</a> here to Register</p>
 
     </div>
     
   </div>

    );
}

export default Home;