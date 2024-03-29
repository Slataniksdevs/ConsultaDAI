import React from 'react';
<<<<<<< HEAD
import Navbar from './components/Navbar'; // Cambiar la ruta de importación a relativa
import Login from './components/login';
import { ChakraProvider } from '@chakra-ui/react';
=======
import Navbar from './components/Navbar/Navbar'; 
import './index.css'; // Importa tus estilos globales si los tienes
import 'tailwindcss/tailwind.css'; // Importa Tailwind CSS

>>>>>>> 733bea16ec1472f0d752b388af214bdacd05ef5d

function App() {
  return (
<ChakraProvider>
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
      <Login />
      </div>

</ChakraProvider>
  );
}

export default App;
