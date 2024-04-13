import React from "react";
import {
  Box,
  Flex,
  Spacer,
  VStack,
  StackDivider,
  Icon,
  Text,
  ChakraProvider
} from "@chakra-ui/react";
import { CalendarIcon, EmailIcon, SettingsIcon } from "@chakra-ui/icons";

function Sidebar() {
  return (
    <VStack
      bg="gray.800"
      h="100vh"
      w="250px"
      divider={<StackDivider borderColor="gray.700" />}
      alignItems="flex-start"
      py="4"
      px="2"
    >
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="white" mb="4">
          Dashboard
        </Text>
      </Box>
      <Box>
        <Text color="white" mb="2">
          Menú
        </Text>
        <Flex align="center" cursor="pointer" mb="2">
          <Icon as={CalendarIcon} color="white" mr="2" />
          <Text color="white">Calendario</Text>
        </Flex>
        <Flex align="center" cursor="pointer" mb="2">
          <Icon as={EmailIcon} color="white" mr="2" />
          <Text color="white">Correo</Text>
        </Flex>
        <Flex align="center" cursor="pointer">
          <Icon as={SettingsIcon} color="white" mr="2" />
          <Text color="white">Configuración</Text>
        </Flex>
      </Box>
      <Spacer />
      <Box>
        <Text color="white">&copy; 2024 Company</Text>
      </Box>
    </VStack>
  );
}

function Calendar() {
  return (
    <Box flex="1" p="4">
      <Text fontSize="xl" mb="4">
        Calendario
      </Text>
      {/* Aquí puedes agregar tu componente de calendario */}
    </Box>
  );
}

function Dashboard() {
  return (
    <ChakraProvider>
      <Flex>
        <Sidebar />
        <Calendar />
      </Flex>
    </ChakraProvider>
  );
}

export default Dashboard;
