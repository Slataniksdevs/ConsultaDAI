import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Input, Button, InputGroup, InputRightElement, Card, CardHeader, CardBody  } from '@chakra-ui/react';
import userApi from '../../api/userApi';


function Login() {
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

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
          required
          placeholder="Nombre Usuario"
          variant="filled"
          mb="4"
          bg="gray.100"
          _hover={{ bg: 'gray.200' }}
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
        />
      <InputGroup size='md'>
      <Input
        required
        pr='4.5rem'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        variant="filled"
        mb="4"
        bg="gray.100"
        _hover={{ bg: 'gray.200' }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
          </InputGroup>
       
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
