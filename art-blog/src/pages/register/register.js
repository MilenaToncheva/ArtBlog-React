import React, { Component } from 'react';
import PageLayout from '../../components/core/page-layout/page-layout';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import styles from './register.module.css';
import authenticate from '../../utils/authenticate.js';
import { Link } from 'react-router-dom';
import AuthContext from '../../Context.js';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: false,
            emailErrorMessage: 'Invalid email!',
            password: '',
            passwordError: false,
            passwordErrorMessage: 'Password should be at least 3 symbols and should contain only letters and digits!',
            confirmPassword: '',
            confirmPasswordError: false,
            confirmPasswordErrorMessage: 'Both passwords do not match!',
            authorName: '',
            authorNameError: false,
            authorNameErrorMessage: 'Invalid Author name! The name should be at least 3 symbols!'
        }
    }

    static contextType = AuthContext;

    emailChangeHandler = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }
    emailBlurHandler = (event) => {
        const { email } = this.state;
        if (!email.includes('@')) {
            this.setState({ emailError: true });
            return;
        } else if (this.state.emailError) {
            this.setState({ emailError: false })
        }
        console.log(this.state);
    }
    authorNameChangeHandler = (event) => {

        const authorName = event.target.value;
        this.setState({ authorName });
    }
    authorNameBlurHandler = (event) => {
        const { authorName } = this.state;
        if (authorName.length < 3) {
            this.setState({ authorNameError: true });
            return;
        } else if (this.state.authorNameError) {
            this.setState({ authorNameError: false });
        }
    }
    passwordChangeHandler = (event) => {
        const password = event.target.value.trim();
        this.setState({ password });
    }
    passwordBlurHandler = (event) => {

        const { password } = this.state;

        if (password.length < 3 || !password.match(/^[a-zA-Z0-9]+$/)) {
            this.setState({ passwordError: true });
            return;
        } else if (this.state.passwordError) {
            this.setState({ passwordError: false });
        }
    }
    confirmPasswordChangeHandler = (event) => {
        const confirmPassword = event.target.value.trim();
        this.setState({ confirmPassword });
    }
    confirmPasswordBlurHandler = (event) => {
        const { password, confirmPassword } = this.state;
        if (confirmPassword !== password) {
            this.setState({ confirmPasswordError: true })
            return;
        } else if (this.state.confirmPasswordError) {
            this.setState({ confirmPasswordError: false });
        }
        console.log(this.state.password, ' ', this.state.confirmPassword);
        console.log(this.state.confirmPasswordError);
    }

    submitHandler = async (event) => {

        event.preventDefault();
        const { email, password, authorName } = this.state;
        console.log('Email', email);
        console.log('authorName', authorName);
        console.log('Pasword', password);
        await authenticate(
            'http://localhost:9999/user/register',
            {
                email,
                authorName,
                password

            },
            (user) => {
                this.context.logIn(user);
                this.props.history.push('/');
            }, (err) => {
                console.log('Error', err)
            });
    }
    render() {
        const { email, password, confirmPassword,
            emailError, emailErrorMessage,
            passwordError, passwordErrorMessage,
            confirmPasswordError, confirmPasswordErrorMessage,
            authorName, authorNameError, authorNameErrorMessage } = this.state;

        return (
            <PageLayout>
                <MDBContainer>
                    <MDBRow >
                        <MDBCol md="12" className="text-center" >
                            <form className={styles.form} onSubmit={this.submitHandler}>
                                <p className="h5 text-center mb-4">Register</p>
                                <div className="black-text">
                                    <MDBInput label="Email" id="email" value={email} onChange={this.emailChangeHandler} onBlur={this.emailBlurHandler} group type="email" />
                                    {emailError ? (<div className={styles.error}>{emailErrorMessage}</div>) : null}
                                    <MDBInput label="Author Name" id="authorName" value={authorName} onChange={this.authorNameChangeHandler}
                                        onBlur={this.authorNameBlurHandler} group type="text" />
                                    {authorNameError ? (<div className={styles.error}>{authorNameErrorMessage}</div>) : null}
                                    <MDBInput label="Password" id="password" value={password} onChange={this.passwordChangeHandler} onBlur={this.passwordBlurHandler}
                                        group type="password" />
                                    {passwordError ? (<div className={styles.error}>{passwordErrorMessage}</div>) : null}
                                    <MDBInput label="Confirm password" id="confirmPassword" value={confirmPassword} onChange={this.confirmPasswordChangeHandler}
                                        onBlur={this.confirmPasswordBlurHandler} group type="password" />
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
        );
    }
}




export default RegisterPage;