import React from 'react';
class ErrorBoundary extends React.Component{
constructor(props){
    super(props);
    this.state={
        hasError:false,
        error:'',
        errorInfo:''
    }
}
static getDerivedStateFromError(error){
    return {hasError:true}
}
componentDidCatch(error, errorInfo) {
   
    console.log('Component Did Catch is triggered', errorInfo);
    console.log({ error, errorInfo });
    this.setState({error, errorInfo });
  }
render(){
    
        if(this.state.hasError){
            window.location.href('/error');
            return null;
        }
        return this.props.children
    }
  
}



export default ErrorBoundary;