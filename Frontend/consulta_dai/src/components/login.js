import React from 'react';
import { Box, Heading, Input, Button } from '@chakra-ui/react';

const Login = () => {
    return (
        <Box maxW="md" mx="auto" mt="8">
      <Heading mb="4">Iniciar sesión</Heading>
      <Input placeholder="Nombre de usuario" mb="4" />
      <Input type="password" placeholder="Contraseña" mb="4" />
      <Button colorScheme="blue">Iniciar sesión</Button>
    </Box>
    );
}
export default Login;