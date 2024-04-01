import React from 'react';
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer';
import Login from './components/Login/login';
import Registro from './components/Login/registro'; 
import { ChakraProvider } from '@chakra-ui/react'


function App() {
  return (
<ChakraProvider>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
        <div className='Login'>
      <Login />
      </div>
      </div>


<div className='App' >
<footer className='App-Footer'>
  <Footer  />
</footer>
</div>
</ChakraProvider>
  );
}

export default App;
