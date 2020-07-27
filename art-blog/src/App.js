import React,{Component} from 'react';
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
  
    logOut = () => {
      document.cookie = "auth= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      this.setState({
        isLoggedIn: false,
        user: null
      });
    }
  
    componentDidMount() {
      const token = getCookie('auth');
  
      if(!token) {
        this.logOut();
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
        console.log(promise);
        return promise.json();
      }).then(response => {
        if(response.status) {
          this.logIn({
            email: response.user.email,
            id: response.user._id
          })
        } else {
          this.logOut();
        }
      })
    }
  
    render() {
      const {isLoggedIn,  user } = this.state;
  
      if (isLoggedIn === null) {
        return (<div>Loading...</div>)
      }
  
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