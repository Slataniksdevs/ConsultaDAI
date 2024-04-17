import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input, Button } from '@chakra-ui/react';
import userApi from '../../api/userApi';

function Login( onLoginSuccess ) {
  const [isOpen, setIsOpen] = useState(false);
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_name || !password) {
      setError('Por favor ingresa un nombre de usuario y contraseña.');
      return;
    }

    try {
      const response = await userApi.login(user_name, password);
      const { token, rol } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);

      // Redirigir a diferentes rutas según el rol del usuario
      switch (rol) {
        case 1:
          navigate('/dashboard-admin');
          break;
        case 2:
          navigate('/dashboard-soporte');
          break;
        case 3:
          navigate('/dashboard-paciente');
          break;
        case 4:
          navigate('/dashboard-profesional');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      setError('Error al iniciar sesión. Por favor intenta nuevamente.');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Box
        maxW="md"
        w="full" 
        bg="white"
        py="8"
        px="10"
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading mb="8" textAlign="center" fontFamily="serif" fontWeight="bold">
          Iniciar sesión
        </Heading>
        <Input
          placeholder="Nombre Usuario"
          variant="filled"
          mb="4"
          bg="gray.100"
          _hover={{ bg: 'gray.200' }}
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          variant="filled"
          mb="4"
          bg="gray.100"
          _hover={{ bg: 'gray.200' }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          colorScheme="teal"
          variant="solid"
          width="full"
          mb="4"
          _hover={{ bg: 'teal.600' }}
          onClick={handleSubmit}
        >
          Iniciar sesión
        </Button>
        {error && <p>{error}</p>}
      </Box>
    </Box>
  );
}

export default Login;
