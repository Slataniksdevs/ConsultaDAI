import React from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" bg="gray.200" p="4">
      <Flex justify="space-between" align="center">
        <Text fontSize="sm">
          © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
        </Text>
        <Text fontSize="sm">
          Desarrollado por{' '}
          <Link href="https://tuempresa.com" target="_blank" rel="noopener noreferrer">
            Tu Equipo de Desarrollo
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}

export default Footer;