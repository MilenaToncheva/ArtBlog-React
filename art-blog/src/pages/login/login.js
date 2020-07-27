import React,{Component} from 'react';
import PageLayout from '../../components/core/page-layout/page-layout';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import styles from './login.module.css';

import { Link } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props){
        super(props);
            this.state={
                email:'',
                password:''
            }
        
    }
submitHandler=(event)=>{

}
    render() {

        return (
            <PageLayout>
                <MDBContainer  >
                    <MDBRow >

                        <MDBCol md="12" className="text-center" >
                            <form className={styles.form} onSubmit={this.submitHandler}>
                                <p className="h5 text-center mb-4">Login</p>
                                <div className="grey-text">

                                    <MDBInput label="Email" group type="email" />

                                    <MDBInput label="Password" group type="password" />

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