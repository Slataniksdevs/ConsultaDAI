import React, { useState } from 'react';
<<<<<<< HEAD
import { Box, Flex, Heading, Input, Button, Link, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 
import Registro from './registro'; 
import userApi from '../../api/userApi';

function Login({ onLoginSuccess }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
=======
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input, Button } from '@chakra-ui/react';
import userApi from '../../api/userApi';

function Login() {
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
>>>>>>> 33b0be357f7bee17e169f16183ae54c111559252

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_name || !password) {
      setError('Por favor ingresa un nombre de usuario y contraseña.');
      return;
    }

    try {
      const response = await userApi.login(user_name, password);
<<<<<<< HEAD
      console.log(response); // Hacer algo con la respuesta, como redirigir a otra página
      setUserName(''); // Limpiar el campo de nombre de usuario
      setPassword(''); // Limpiar el campo de contraseña
      setIsOpen(true); // Abrir el modal de bienvenida
      setTimeout(() => {
        setIsOpen(false);
        onLoginSuccess(); // Llamar a onLoginSuccess para marcar al usuario como autenticado
        navigate('/dashboard'); // Redirigir al usuario al dashboard después de dos segundos
      }, 2000);
=======
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
>>>>>>> 33b0be357f7bee17e169f16183ae54c111559252
    } catch (error) {
      setError(error);
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
        <center>{error && <p>{error}</p>}</center> 
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
<<<<<<< HEAD
        <Link
          color="teal.500"
          fontWeight="bold"
          textAlign="center"
          display="block"
          onClick={handleOpenModal}
        >
          ¿No tienes una cuenta? ¡Regístrate aquí!
        </Link>
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Text mb="4">¡Bienvenido!</Text>
              <Text>AHORA PASA AL DASHBOARD (NO SE RENDERIZA EL COMPONENTEN).</Text>
            </ModalBody>
            <ModalCloseButton />
          </ModalContent>
        </Modal>
=======
        {error && <p>{error}</p>}
>>>>>>> 33b0be357f7bee17e169f16183ae54c111559252
      </Box>
    </Box>
  );
}

export default Login;
