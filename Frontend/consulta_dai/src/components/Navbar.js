import React from 'react';

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/'>Home</a></li>
                <li><a href='/'>Home</a></li>
            </ul>
        </nav>
    );
}

const App = () => {
    return (
      <div>
        {/* Renderizar la barra de navegación */}
        <Navbar />
        
        {/* Contenido de la página */}
        <h1>¡Bienvenido a mi sitio!</h1>
        <p>Este es el contenido de mi página.</p>
      </div>
    );
  }
  
  export default App;