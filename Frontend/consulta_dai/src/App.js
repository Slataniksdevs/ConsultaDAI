import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar al inicio si hay un usuario autenticado en el localStorage
  useEffect(() => {
    const userAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(userAuthenticated);
  }, []);

  // Función para autenticar al usuario (por ejemplo, luego de un login exitoso)
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Almacenar en localStorage
  };

  // Función para desautenticar al usuario
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Quitar del localStorage al hacer logout
  };

  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          {/* Mostrar Navbar solo si NO está autenticado (en el Login) */}
          {!isAuthenticated && (
            <header className="App-header">
              <Navbar />
            </header>
          )}
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
