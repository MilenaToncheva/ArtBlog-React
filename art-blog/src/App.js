import React, { useState, useEffect } from 'react';
import AuthContext from './Context.js';

import getCookie from './utils/getCookie.js';

const App = (props) => {

    const [user, setUser] = useState({email:'',id:''});
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const logIn = (user) => {
        console.log('User in App Login: ',user)
        setIsLoggedIn(true);
        setUser({...user,email:user.email,id:user.id});
        
    }   

    const logOut = () => {
        document.cookie = "auth= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        setIsLoggedIn(false);
    }


    useEffect(() => {
        const token = getCookie('auth');
        if (!token || token === '') {
            logOut();
            setIsLoading(false);
            return;
        }


        fetch('http://localhost:9999/user/verify', {
            method: 'POST',
            body: JSON.stringify({
                token
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(promise => {
            console.log('Promise: ', promise);
            return promise.json();
        }).then(response => {
            console.log('Response: ', response);
            if (response.status) {
                logIn({
                    email: response.user.email,
                    id: response.user._id
                })
            } else {
                logOut();
            }
            setIsLoading(false);
        });

       

    }, []);
    return (
        <AuthContext.Provider value={{
            user,
            isLoggedIn,
            logIn,
            logOut
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default App;