import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  useMediaQuery,
} from '@chakra-ui/react';
import userApi from '../../api/userApi';
import backgroundImage from '../../static/Imagenes/Portada_Arbeit_5.jpg';

function Login({ onLogin }) {
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleClick = () => setShow(!show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user_name || !password) {
      setError('Por favor ingresa un nombre de usuario y contraseña.');
      onOpen();
      return;
    }
  
    try {
      const response = await userApi.login(user_name, password);
      const { token, rol } = response;
      localStorage.setItem('token', token);
      localStorage.setItem('rol', rol);

      onLogin();

      navigate('/dashboard', { state: { userData: response } });

      toast({
        title: `Bienvenido, ${user_name}!`,
        description: 'Has iniciado sesión correctamente.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      setError('Nombre de usuario o contraseña incorrectos');
      onOpen();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      backgroundImage={`url(${backgroundImage})`}
    >
      <Box
        maxW={isMobile ? "80%" : "md"}  // Ajuste del ancho del formulario según el tamaño de la pantalla
        w="auto"
        bg="white"
        py="8"
        px={isMobile ? "4" : "10"} // Ajuste del padding según el tamaño de la pantalla
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading mb="8" textAlign="center" fontFamily="Gotham" fontWeight="bold" color="teal.500">
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
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? 'text' : 'password'}
            placeholder="Contraseña"
            variant="filled"
            mb="4"
            bg="gray.100"
            _hover={{ bg: 'gray.200' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? 'Ocultar' : 'Mostrar'}
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
        {error && (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Error</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text color="red.500">{error}</Text>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </Box>
    </Box>
  );
}

export default Login;
