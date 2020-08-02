import React, { Component } from 'react';
import AuthContext from './Context.js';
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return cookieValue ? cookieValue[2] : null;
}
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: null,
            user: null
        }
    }

    logIn = (user) => {
        this.setState({
            isLoggedIn: true,
            user
        })
    }

    logOut = async (token) => {
        try {
            if (token) {
                //console.log('Token: ',token);
                const promise = await fetch('http:/localhost:9999/user/logout', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token })
                });
                if (promise.status !== 200) {
                    throw promise;
                }
                const result = await promise.json();
                return result;
            }

            document.cookie = "auth= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
            this.setState({
                isLoggedIn: false,
                user: null
            });
        } catch (err) {
            console.log(err);
        }
    }




    componentDidMount() {
        const token = getCookie('auth');

        console.log('Cookie-Auth:', token);
        if (!token || token === '') {
            this.logOut(token);
            return;
        }

        fetch('http://localhost:9999/user/verify', {
            method: 'POST',
            body: JSON.stringify({
                token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            console.log('Promise: ', promise);
            return promise.json();
        }).then(response => {
            console.log('Response: ',response);
            if (response.status) {
                this.logIn({
                    email: response.user.email,
                    id: response.user._id
                })
            } else {
                this.logOut(token);
            }
        })
    }

    render() {
        const { isLoggedIn, user } = this.state;

       // if (isLoggedIn === null) {
       //     return (<div>Loading...</div>)
       // }

        return (
            <AuthContext.Provider value={{
                isLoggedIn,
                user,
                logIn: this.logIn,
                logOut: this.logOut
            }}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }
}
export default App;