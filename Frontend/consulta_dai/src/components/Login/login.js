import React, { useState } from 'react';
import { Box, Flex, Heading, Input, Button, Link, Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import Registro from './registro'; // Importa el componente de registro

function Login() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Flex
      align="center"
      justify="center"
      minHeight="100vh"
      bgGradient="linear(to-r, teal.500, cyan.500)"
      px={{ base: '10', md: '20' }} // Ajustar el padding en diferentes tamaños de pantalla
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
          placeholder="Correo electrónico"
          variant="filled"
          mb="4"
          bg="gray.100"
          _hover={{ bg: 'gray.200' }}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          variant="filled"
          mb="4"
          bg="gray.100"
          _hover={{ bg: 'gray.200' }}
        />
        <Button
          colorScheme="teal"
          variant="solid"
          width="full"
          mb="4"
          _hover={{ bg: 'teal.600' }}
          onClick={handleOpenModal}
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
              <Registro /> {/* Muestra el componente de registro dentro del modal */}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Flex>
  );
}

export default Login;
