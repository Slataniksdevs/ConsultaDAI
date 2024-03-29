import React from 'react';
import Navbar from './components/Navbar'; // Cambiar la ruta de importación a relativa
import Login from './components/login';
import { ChakraProvider } from '@chakra-ui/react';

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
