// tailwind.config.js

module.exports = {
  mode: 'jit', // Habilita el modo Just-In-Time (JIT)
  purge: [],
  darkMode: false, // Opciones: 'media' o 'class'
  theme: {
    extend: {
      colors: {
        // Personaliza los colores según tu paleta
        primary: '#FF0000',
        secondary: '#00FF00',
        // ...
      },
      fontFamily: {
        // Define las fuentes personalizadas que quieras usar
        sans: ['Roboto', 'sans-serif'],
        // ...
      },
      // Extiende otras configuraciones de tema según sea necesario
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
