// Contiene la logica de los endpoints relacionados a las reservas de horas 

import axios from 'axios';

const API_URL = 'http://localhost:5000'; 


//Obtener el usuario 
export const getUserById = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/usuarios/get_user_by_id/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      throw error;
    }
  };
  
