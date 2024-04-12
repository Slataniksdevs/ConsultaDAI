import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading, Input, Button, Link, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom'; 
import Registro from './registro'; 
import userApi from '../../api/userApi';

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para controlar si el usuario ha iniciado sesión
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(false);
        navigate('/dashboard'); // Redirigir al usuario al dashboard después de dos segundos
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, navigate]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_name || !password) {
      setError('Por favor ingresa un nombre de usuario y contraseña.');
      return;
    }
  
    try {
      // Realizar la lógica de inicio de sesión
      const response = await userApi.login(user_name, password);
      console.log(response); // Hacer algo con la respuesta, como redirigir a otra página
      setIsLoggedIn(true); // Marcar al usuario como autenticado
      setUserName(''); // Limpiar el campo de nombre de usuario
      setPassword(''); // Limpiar el campo de contraseña
      setIsOpen(true); // Abrir el modal de bienvenida
    } catch (error) {
      setError('Error al iniciar sesión. Por favor intenta nuevamente.');
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      minHeight="100vh"
      bgGradient="linear(to-r, teal.500, cyan.500)"
      px={{ base: '10', md: '20' }} 
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
        {error && <p>{error}</p>}
      </Box>
    </Flex>
  );
}

export default Login;
