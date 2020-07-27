import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css';
 import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import Navigation from './navigation.js';
ReactDOM.render(
  <React.StrictMode>
    <App>
    <Navigation  />
    </App>
  </React.StrictMode>,
  document.getElementById('root')
);

