import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard'; 
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
          </Routes>
          <footer className='App-Footer'>
            <Footer />
          </footer>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
