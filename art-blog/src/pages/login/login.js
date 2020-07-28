import React, { Component } from 'react';
import PageLayout from '../../components/core/page-layout/page-layout';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import styles from './login.module.css';

import { Link } from 'react-router-dom';
import authenticate from '../../utils/authenticate.js';
import AuthContext from '../../Context.js';
class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailError: false,
            emailErrorMessage: 'Invalid email!',
            password: '',
            passwordError: false,
            passwordErrorMessage: 'Invalid credentials!'
        }

    }


    emailChangeHandler = (event) => {
        const email = event.target.value;
        this.setState({ email });
    }
    emailBlurHandler = (event) => {
        const { email } = this.state;
        if (!email.includes('@') || email.length < 3) {
            this.setState({ emailError: true })
            return;
        } else if (this.state.emailError) {
            this.setState({ emailError: false })
        }
    }
    passwordChangeHandler = (event) => {
        const password = event.target.value;
        this.setState({ password });
    }
    passwordBlurHandler = (event) => {
        const { password } = this.state;
        if (password.length < 3) {
            this.setState({ passwordError: true });
            return;
        } else if (this.state.passwordError) {
            this.setState({ passwordError: false });
        }
    }

    static contextType = AuthContext;

    submitHandler = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        await authenticate('http://localhost:9999/user/login', {
            email,
            password
        }, (user) => {
            this.context.logIn(user);
            this.props.history.push('/');
        }, (err) => {
            console.log(err);
        });


    }
    render() {
        const { email, emailError, emailErrorMessage, password, passwordError, passwordErrorMessage } = this.state;
        return (
            <PageLayout>
                <MDBContainer  >
                    <MDBRow >
                        <MDBCol md="12" className="text-center" >
                            <form className={styles.form} onSubmit={this.submitHandler}>
                                <p className="h5 text-center mb-4">Login</p>
                                <div className="black-text">

                                    <MDBInput label="Email" group type="email" value={email} onChange={this.emailChangeHandler} onBlur={this.emailBlurHandler} />
                                    {emailError ? (<div className={styles.error}>{emailErrorMessage}</div>) : null}
                                    <MDBInput label="Password" group type="password" value={password} onChange={this.passwordChangeHandler} onBlur={this.passwordBlurHandler} />
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
}
export default LoginPage;