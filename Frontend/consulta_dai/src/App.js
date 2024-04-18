import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar/navbar'; 
import Footer from './components/Footer/footer';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard'; 
import { ChakraProvider } from '@chakra-ui/react';

function App() {
<<<<<<< HEAD
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const imprime = () => {
    console.log("Elemento de muestra para mover los datos entre componentes")
  }

=======
>>>>>>> 33b0be357f7bee17e169f16183ae54c111559252
  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Navbar />
          </header>
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess}  numerodelasuerte={imprime} />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />
          </Routes>
          <footer className='App-Footer'>                   
            <Footer />
          </footer>
=======
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          
          <footer className='App-Footer'>                   
            <Footer />
          </footer>
         
>>>>>>> 33b0be357f7bee17e169f16183ae54c111559252
        </div>       
      </Router>
    </ChakraProvider>
  );
}

export default App;