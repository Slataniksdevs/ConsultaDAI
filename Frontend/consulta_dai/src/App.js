import React from 'react';
import Navbar from './components/Navbar/Navbar'; 
import './index.css'; // Importa tus estilos globales si los tienes
import 'tailwindcss/tailwind.css'; // Importa Tailwind CSS


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
    </div>
  );
}

export default App;


