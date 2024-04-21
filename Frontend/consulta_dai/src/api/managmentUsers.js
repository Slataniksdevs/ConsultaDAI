import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

// Obtener Lista de Usuarios
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/usuarios/get_clientes`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

// Crear Usuario
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/usuarios/clientes`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

// Actualizar Usuario
export const updateUser = async (userId, userData) => {
  try {
    const response = await axios.put(`${API_URL}/usuarios/update_cliente/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

// Eliminar Usuario
export const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_URL}/usuarios/delete_user/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};
