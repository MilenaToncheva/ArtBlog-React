import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/core/page-layout/page-layout';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import styles from './login.module.css';

import { Link } from 'react-router-dom';
import authenticate from '../../utils/authenticate.js';
import AuthContext from '../../Context.js';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('Invalid email!');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('Invalid credentials!');
    const history = useHistory();

    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }
    const emailBlurHandler = (event) => {

        if (!email.includes('@') || email.length < 3) {
            setEmailError(true);
            return;
        } else if (emailError) {
            setEmailError(false);
        }
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }
    const passwordBlurHandler = (event) => {
        if (password.length < 3) {
            setPasswordError(true);
            return;
        } else if (passwordError) {
            setPasswordError(false);
        }
    }

    const context = useContext(AuthContext);

    const submitHandler = async (event) => {
        if (emailError || passwordError) {
            history.push('/error', {
                message: 'Invalid input!'
            });
            return;
        }
        event.preventDefault();

        await authenticate('http://localhost:9999/user/login', {
            email,
            password
        }, (user) => {
            context.logIn(user);

            history.push('/home/');
        }, (err) => {
            
                history.push('/error', {
                    message: err.message || err
                })
            
            }

        )

    }


    return (
        <PageLayout title="">
            <MDBContainer  >
                <MDBRow >
                    <MDBCol md="12" className="text-center" >
                        <form className={styles.form} onSubmit={submitHandler}>
                            <h1>Login</h1>
                            <div className="black-text">

                                <MDBInput label="Email" group type="email" value={email} onChange={emailChangeHandler}
                                    onBlur={emailBlurHandler} />
                                {emailError ? (<div className={styles.error}>{emailErrorMessage}</div>) : null}
                                <MDBInput label="Password" group type="password" value={password} onChange={passwordChangeHandler}
                                    onBlur={passwordBlurHandler} />
                                {passwordError ? (<div className={styles.error}>{passwordErrorMessage}</div>) : null}
                            </div>
                            <div className="text-center">
                                <MDBBtn color="primary" type="submit">Login</MDBBtn>
                            </div>

                            <p className="text-center">
                                Not Registered? <Link to="/user/register">Register</Link>.
                                </p>
                        </form>
                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </PageLayout >
    )

}
export default LoginPage;