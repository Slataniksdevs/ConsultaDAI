// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input, Button, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Text } from '@chakra-ui/react';
import userApi from '../../api/userApi';

function Login() {
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
    navigate('/dashboard'); // Redirigir al dashboard después de cerrar el modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_name || !password) {
      setError('Por favor ingresa un nombre de usuario y contraseña.');
      return;
    }

    try {
      const response = await userApi.login(user_name, password);
      console.log(response);
      setUserName('');
      setPassword('');
      setIsOpen(true); // Mostrar el modal después del inicio de sesión exitoso
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
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Text mb="4">¡Bienvenido!</Text>
            <Text>AHORA PASA AL DASHBOARD.</Text>
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Login;
