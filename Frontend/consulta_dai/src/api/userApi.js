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

      // Verifica si la respuesta contiene un token y un rol
      if (response.data && response.data.token && response.data.rol) {
        // Extrae el token JWT y el rol de la respuesta
        const { token, rol } = response.data;
        console.log(token, rol);
        
        // Almacena el token JWT y el rol en el almacenamiento local
        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol);
        localStorage.setItem('user_name', user_name);

        // Devuelve el token JWT y el rol del usuario
        return { token, rol };
      } else {
        throw 'No se recibió un token JWT o un rol en la respuesta';
      }
    } catch (error) {
      throw error.response.data.error || 'Error al intentar iniciar sesión'; // Mensaje de error predeterminado
    }
  }
};

export default userApi;
