import React from 'react';

import Footer from './components/core/footer/footer';
import Navbar from './components/core/navbar/navbar';
import Home from './components/home/home';
import './App.css';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Footer/>
      
      <Home />
     
    </div>
  );
}

export default App;
