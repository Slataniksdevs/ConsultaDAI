import React from 'react';
import { Box, Flex, Heading, Input, Button } from '@chakra-ui/react';

function Registro() {
  return (
    <Box>
      <Heading mb="4" textAlign="center" fontFamily="serif" fontWeight="bold">
        Registro
      </Heading>
      <Input
        placeholder="Nombre"
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
      >
        Registrarse
      </Button>
    </Box>
  );
}

export default Registro;
