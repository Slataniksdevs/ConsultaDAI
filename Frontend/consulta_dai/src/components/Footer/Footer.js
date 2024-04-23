import React from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive'; // Importar useMediaQuery

function Footer() {
  // Define un breakpoint para determinar si es un dispositivo móvil
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Box
      as="footer"
      bg="gray.200"
      p="4"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="999"
      width="100%"
    >
      <Flex
        justify={isMobile ? 'center' : 'space-between'} // Centra en dispositivos móviles
        align="center"
        direction={isMobile ? 'column' : 'row'} // Cambia la dirección a columna para móviles
      >
        <Text fontSize="sm" textAlign={isMobile ? 'center' : 'left'}>
          © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
        </Text>
        <Text fontSize="sm" textAlign={isMobile ? 'center' : 'right'}>
          Desarrollado por{' '}
          <Link
            href="https://tuempresa.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tu Equipo de Desarrollo
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}

export default Footer;
