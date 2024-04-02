import React from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';

function Navbar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Box fontSize="xl" fontWeight="bold">
          Logo
        </Box>
      </Flex>

      <Box
        display={{ base: 'block', md: 'none' }}
        onClick={() => console.log('Toggle menu')} // Aquí puedes implementar la lógica para abrir/cerrar el menú en dispositivos móviles
      >
        {/* Icono para mostrar en dispositivos móviles */}
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75zm0 5A.75.75 0 0 1 .75 9h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 2 9.75zm0 5a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75z"
          />
        </svg>
      </Box>

      <Box
        display={{ base: 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <Link href="#home" mr={5}>
          Home
        </Link>
        <Link href="#about" mr={5}>
          About
        </Link>
        <Link href="#contact" mr={5}>
          Iniciar sesión
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
