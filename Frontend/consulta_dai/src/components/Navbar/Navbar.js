import React, { useState } from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';
import Sidebar from '../SideBar/Sidebar';

function Navbar() {
  const [isOpen, setIsOpen] = useState(true); // Cambiar el estado inicial a true

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Navbar */}
      <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="teal.500"
        color="white"
      >
        {/* Logo */}
        <Flex align="center" mr={5}>
          <Box fontSize="xl" fontWeight="bold">
            Logo
          </Box>
        </Flex>

        {/* Icono de hamburguesa */}
        <Box
          display={{ base: 'block', md: 'none' }}
          onClick={toggleMenu}
          cursor="pointer"
        >
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

        {/* Menú */}
        <Box
          display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
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

      {/* Sidebar */}
      {/* Siempre mostrar el Sidebar sin necesidad de hacer clic en el icono */}
      <Box
        bg="gray.700"
        w="full"
        h="full"
        position="fixed"
        top="0"
        left="0"
        zIndex="999"
      >
        {/* Botón para cerrar la sidebar */}
        <Box
          as="button"
          onClick={toggleMenu}
          color="white"
          position="absolute"
          top="1rem"
          right="1rem"
          fontSize="xl"
          zIndex="1000"
          bg="transparent"
          border="none"
        >
          <svg
            fill="white"
            width="12px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Close</title>
            <path
              fillRule="evenodd"
              d="M11.42 10l3.28-3.28a.75.75 0 1 0-1.06-1.06L10 8.94 6.72 5.66a.75.75 0 0 0-1.06 1.06L8.94 10l-3.28 3.28a.75.75 0 1 0 1.06 1.06L10 11.06l3.28 3.28a.75.75 0 1 0 1.06-1.06L11.06 10z"
            />
          </svg>
        </Box>
        {/* Renderizar el Sidebar */}
        <Sidebar />
      </Box>
    </>
  );
}

export default Navbar;
