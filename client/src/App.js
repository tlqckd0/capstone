import React from 'react';
import Footer from './fragment/Footer';
import Header from './fragment/Header';
import FrontPage from './page/FrontPage'

function App() {
  return (
    <div 
    className="App">
      <Header/>
      <FrontPage/>
      <Footer/>
    </div>
  );
}

export default App;
