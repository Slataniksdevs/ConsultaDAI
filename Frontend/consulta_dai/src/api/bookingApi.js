import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Función para crear una reserva
export const createBooking = async (bookingData, token) => {
  try {
    const response = await axios.post(`${API_URL}/reserva/servicio`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`, // Agregar el token JWT en los headers
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Error en la respuesta del servidor (status code fuera de rango 2xx)
      console.error('Error al crear reserva:', error.response.data);
      throw new Error(error.response.data.error || 'Error al crear reserva');
    } else if (error.request) {
      // Error de conexión
      console.error('Error de conexión al crear reserva:', error.request);
      throw new Error('Error de conexión al crear reserva');
    } else {
      // Otros errores
      console.error('Error al crear reserva:', error.message);
      throw new Error('Error al crear reserva');
    }
  }
};
