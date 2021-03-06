import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayout from '../../components/core/page-layout/page-layout';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import styles from './register.module.css';
import authenticate from '../../utils/authenticate.js';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context.js';
import ErrorBoundary from '../../ErrorBoundary';

const RegisterPage = () => {
    const context = useContext(AuthContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage] = useState('Invalid email!');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage]
        = useState('Password should be at least 3 symbols and should contain only letters and digits!');
    const [cv, setCv] = useState('');
    const [cvError, setCvError] = useState(false);
    const [cvErrorMessage] = useState('Invalid cv! Should be at least 10 symbols long!')
    const [avatar, setAvatar] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [confirmPasswordErrorMessage]
        = useState('Both passwords do not match!');
    const [authorName, setAuthorName] = useState('');
    const [authorNameError, setAuthorNameError] = useState(false);
    const [authorNameErrorMessage] = useState('Invalid Author name! The name should be at least 3 symbols!');
    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }

    const emailBlurHandler = (event) => {
        if (!email.includes('@')) {
            setEmailError(true);
            return;
        } else if (emailError) {
            setEmailError(false);
        }
    }
    const authorNameChangeHandler = (event) => {
        setAuthorName(event.target.value);
    }
    const authorNameBlurHandler = (event) => {

        if (authorName.length < 3) {
            setAuthorNameError(true);
            return;
        } else if (authorNameError) {
            setAuthorNameError(false);
        }
    }
    const cvChangeHandler = (event) => {
        setCv(event.target.value);
    }
    const cvBlurHandler = (event) => {
        if (cv.length < 10) {
            setCvError(true);
            return;
        } else if (cvError) {
            setCvError(false);
        }
    }
    const avatarChangeHandler = (event) => {
        setAvatar(event.target.value);
    }
    const avatarBlurHandler = (event) => {
        if (!avatar) {
            setAvatar('https://res.cloudinary.com/mt-art-gallery/image/upload/c_scale,h_95/v1597071508/art-blog-react/avatar_j4uwue.jpg');
        }
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }
    const passwordBlurHandler = (event) => {
        if (password.length < 3 || !password.match(/^[a-zA-Z0-9]+$/)) {
            setPasswordError(true);
            return;
        } else if (passwordError) {
            setPasswordError(false);
        }
    }
    const confirmPasswordChangeHandler = (event) => {
        setConfirmPassword(event.target.value);
    }
    const confirmPasswordBlurHandler = (event) => {
        if (confirmPassword !== password) {
            setConfirmPasswordError(true);
            return;
        } else if (confirmPasswordError) {
            setConfirmPasswordError(false);
        }
    }

    const submitHandler = async (event) => {

        if (emailError || passwordError || cvError || confirmPasswordError || authorNameError) {
            history.push('/error', {
                message: 'Invalid input'
            });
            return;
        }

        event.preventDefault();
        await authenticate(
            'http://localhost:9999/user/register',
            {
                email,
                authorName,
                avatar,
                cv,
                password
            },
            (user) => {
                context.logIn(user);
                history.push('/home/');
            },
            (err) => {
                history.push('/error', {
                    message: err.message || err
                });
            });
    }

    return (
        <ErrorBoundary>
            <PageLayout>
                <MDBContainer>
                    <MDBRow >
                        <MDBCol md="12" className="text-center" >
                            <form className={styles.form} onSubmit={submitHandler}>
                                <p className="h5 text-center mb-4">Register</p>
                                <div className="black-text">
                                    <MDBInput label="Email" id="email" value={email} onChange={emailChangeHandler}
                                        onBlur={emailBlurHandler} group type="email" />
                                    {emailError ? (<div className={styles.error}>{emailErrorMessage}</div>) : null}
                                    <MDBInput label="Author Name" id="authorName" value={authorName} onChange={authorNameChangeHandler}
                                        onBlur={authorNameBlurHandler} group type="text" />

                                    {authorNameError ? (<div className={styles.error}>{authorNameErrorMessage}</div>) : null}
                                    <MDBInput type="textarea" label="cv" rows="5" value={cv} onChange={cvChangeHandler} onBlur={cvBlurHandler} />
                                    {cvError ? (<div className={styles.error}>{cvErrorMessage}</div>) : null}
                                    <MDBInput label="avatar" value={avatar} onChange={avatarChangeHandler} onBlur={avatarBlurHandler} />
                                    <MDBInput label="Password" id="password" value={password} onChange={passwordChangeHandler}
                                        onBlur={passwordBlurHandler} group type="password" />
                                    {passwordError ? (<div className={styles.error}>{passwordErrorMessage}</div>) : null}
                                    <MDBInput label="Confirm password" id="confirmPassword" value={confirmPassword} onChange={confirmPasswordChangeHandler}
                                        onBlur={confirmPasswordBlurHandler} group type="password" />
                                    {confirmPasswordError ? (<div className={styles.error}>{confirmPasswordErrorMessage}</div>) : null}
                                </div>
                                <div className="text-center">
                                    <MDBBtn color="primary" type="submit" >Register</MDBBtn>
                                </div>
                                <p className="text-center">
                                    Already Registered? <Link to="/user/login">Login</Link>.
                                </p>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </PageLayout >
        </ErrorBoundary>

    );
}





export default RegisterPage;