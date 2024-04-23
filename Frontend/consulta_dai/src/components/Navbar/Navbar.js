import React, { useState } from 'react';
import { Box, Flex, Link, IconButton, useDisclosure, Icon } from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive'; // Importar useMediaQuery
import { HamburgerIcon } from '@chakra-ui/icons'; // Importar HamburgerIcon de Chakra UI Icons

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Cambia a useMediaQuery

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      width="100%"
    >
      <Flex align="center" mr={5}>
        <Box fontSize="xl" fontWeight="bold">
          Logo
        </Box>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }}>
        {/* Botón Hamburguesa con Chakra Icon */}
        <IconButton
          icon={<Icon as={HamburgerIcon} />}
          aria-label="Abrir menú"
          onClick={onToggle}
          color="white"
          fontSize="xl"
        />
      </Box>

      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
        width={{ base: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
        flexDirection={{ base: 'column', md: 'row' }}
        mt={{ base: isMobile ? '12' : '0', md: '0' }}
      >
        <Link href="#home" mr={isMobile ? '0' : '3'} mb={isMobile ? '2' : '0'}>
          Home
        </Link>
        <Link href="#about" mr={isMobile ? '0' : '3'} mb={isMobile ? '2' : '0'}>
          About
        </Link>
        <Link href="#contact" mr={isMobile ? '0' : '3'} mb={isMobile ? '2' : '0'}>
          Iniciar sesión
        </Link>
      </Box>
    </Flex>
  );
}

export default Navbar;
