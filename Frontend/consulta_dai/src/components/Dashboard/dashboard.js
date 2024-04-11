import React from 'react';
import { Box, Heading, Text, Flex, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

function Dashboard() {
  return (
    <Box p="4">
      <Heading as="h1" size="xl" mb="4">¡Hola Mundo! Este es el Dashboard.</Heading>
      
      <Flex justify="space-between" align="center" mb="4">
        <Stat>
          <StatLabel>Usuarios activos</StatLabel>
          <StatNumber>35</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Productos vendidos</StatLabel>
          <StatNumber>102</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Ingresos mensuales</StatLabel>
          <StatNumber>$5,350</StatNumber>
        </Stat>
      </Flex>
      
      <Text fontSize="lg">Bienvenido a tu panel de control. Aquí puedes ver un resumen de las métricas importantes de tu negocio.</Text>
    </Box>
  );
}

export default Dashboard;
