import React, { useState } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/footer';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para autenticar al usuario (por ejemplo, luego de un login exitoso)
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Función para desautenticar al usuario
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <Navbar/>
          <Routes>
            {/* Ruta para el login */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            {/* Ruta protegida para el dashboard */}
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <>
                    <Dashboard />
                  </>
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            {/* Ruta protegida para cualquier otra ruta */}
            <Route
              path="/*"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
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
