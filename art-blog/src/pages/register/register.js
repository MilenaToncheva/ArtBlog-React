import React from 'react';
import PageLayout from '../../components/core/page-layout/page-layout';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import styles from './register.module.css';

import { Link } from 'react-router-dom';

const RegisterPage = () => {
    return (
        <PageLayout>
            <MDBContainer  >
                <MDBRow >
                    
                    <MDBCol md="12"className="text-center" >
                        <form className={styles.form}>
                            <p className="h5 text-center mb-4">Register</p>
                            <div className="grey-text">
                                <MDBInput label="Email" group type="email" validate error="wrong"
                                    success="right" />
                                <MDBInput label="Password"  group type="password" validate />
                                <MDBInput label="Confirm password"  group type="password" validate />
                            </div>
                            <div className="text-center">
                                <MDBBtn color="primary">Register</MDBBtn>
                            </div>
                            
                                <p className="text-center">
                                    Already Registered? <Link to="/user/login">Login</Link>.
                                </p>
                            

                        </form>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </PageLayout >
    )
}




export default RegisterPage;