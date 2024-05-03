import React from 'react';
import { Box, Flex, Heading, Input, Button } from '@chakra-ui/react';

function mantenedorReserva() {
  return (
    <Flex
      minHeight="100vh"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Box 
      width="400px" 
      p="6" borderWidth="1px" 
      borderRadius="lg">
        <Heading mb="4" textAlign="center" fontFamily="serif" fontWeight="bold">
          Registro
        </Heading>
        <form>
          <Input
            placeholder="Nombre"
            variant="filled"
            mb="4"
            bg="gray.100"
            _hover={{ bg: 'gray.200' }}
          />
          <Input
            placeholder="Apellidos"
            variant="filled"
            mb="4"
            bg="gray.100"
            _hover={{ bg: 'gray.200' }}
          />
          <Input
            placeholder="Correo electrónico"
            variant="filled"
            mb="4"
            bg="gray.100"
            _hover={{ bg: 'gray.200' }}
          />
          <Input
            placeholder="Confirmar correo electrónico"
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
          <Input
            type="password"
            placeholder="Confirmar contraseña"
            variant="filled"
            mb="4"
            bg="gray.100"
            _hover={{ bg: 'gray.200' }}
          />
          <Input
            type="text"
            placeholder="Dirección"
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
          >
            Registrarse
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default mantenedorReserva;
