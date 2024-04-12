import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'; 
import Footer from './components/Footer/Footer';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard'; 
import { ChakraProvider, Box, Heading, Text, Flex, Stat, StatLabel, StatNumber  } from '@chakra-ui/react';

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
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
          <br>
          </br>

          <div>
            <Dashboard />
            </div>

          <br>
          </br>        
          <footer className='App-Footer'>                   
            <Footer />
          </footer>
        
        </div>       
      </Router>
    </ChakraProvider>
  );
}

export default App;
