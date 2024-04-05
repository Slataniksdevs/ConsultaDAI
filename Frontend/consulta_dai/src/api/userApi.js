import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:5000'; 
const userApi = {
    login: async (user_name, password) => {
      try {
        const response = await axios.post(`${BASE_URL}/usuarios/login`, {
          user_name: user_name,
          password: password
        });
  
        // Imprime el código de estado de la respuesta en la consola
        console.log('Código de estado de la respuesta:', response.status);
  
        return response.data;
      } catch (error) {
        throw error.response.data.error || 'Error al intentar iniciar sesión'; // Mensaje de error predeterminado
      }
    }
  };
  

export default userApi;
