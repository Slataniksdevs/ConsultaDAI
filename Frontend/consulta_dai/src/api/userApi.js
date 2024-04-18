import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'; 

const userApi = {
    login: async (user_name, password) => {
      try {
        const response = await axios.post(`${BASE_URL}/login/inicio`, {
          user_name: user_name,
          password: password
        });
  
        // Imprime el código de estado de la respuesta en la consola
        console.log('Código de estado de la respuesta:', response.status);
  
        // Verifica si la respuesta contiene un token
        if (response.data && response.data.token) {
          // Extrae el token JWT de la respuesta
          const token = response.data.token;
          console.log(token);
          
          // Decodifica el token JWT para obtener la información sobre el rol del usuario
          const decodedToken = parseJwt(token);
          
          // Devuelve el token JWT y el rol del usuario
          return { token, rol: decodedToken.rol };
        } else {
          throw 'No se recibió un token JWT en la respuesta';
        }
      } catch (error) {
        throw error.response.data.error || 'Error al intentar iniciar sesión'; // Mensaje de error predeterminado
      }
    }
  };
  
// Función para decodificar un token JWT
function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      throw 'Error al decodificar el token JWT';
    }
}
  
export default userApi;
