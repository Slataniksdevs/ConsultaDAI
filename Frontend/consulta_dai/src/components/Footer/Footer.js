import React from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

function Footer() {
  return (
    <Box as="footer" bg="#006271" p="4" color="white">
      <Flex justify="space-between" align="center">
        <Text fontSize="sm" fontWeight="bold">
          © {new Date().getFullYear()} dev
        </Text>
        <Text fontSize="sm">
          Desarrollado por{' '}
          <Link href="https://tuempresa.com" target="_blank" rel="noopener noreferrer" textDecoration="underline">
            
          </Link>
        </Text>
      </Flex>
    </Box>
  );
}

export default Footer;
