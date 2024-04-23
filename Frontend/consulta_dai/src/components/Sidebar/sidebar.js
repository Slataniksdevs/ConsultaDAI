import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  VStack,
  Spacer,
  StackDivider,
  Icon,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { CalendarIcon, EmailIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

function Sidebar({ rol, setView, isOpen, toggleSidebar }) {
  const handleLogout = () => {
    localStorage.removeItem("rol");
    window.location.href = "/";
  };

  const handleInicioClick = () => {
    setView('calendar');
    toggleSidebar(); // Cerrar el sidebar al hacer clic en Inicio
  };
  
  return (
    <VStack
      bg="gray.800"
      h="100vh"
      w={{ base: isOpen ? "250px" : "64px", md: "250px" }} // Ancho del sidebar
      divider={<StackDivider borderColor="gray.700" />}
      alignItems="flex-start"
      py="4"
      px="2"
      pos="fixed"
      top="0"
      left="0"
      zIndex="1"
      overflowY="auto"
      display={{ base: isOpen ? "flex" : "none", md: "flex" }} // Mostrar el sidebar en dispositivos grandes
    >
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="white" mb="4">
          Consulta Arbeit
        </Text>
      </Box>
      <Box>
        <Text color="white" mb="2">
          Menú
        </Text>
        <Flex align="center" cursor="pointer" mb="2" onClick={handleInicioClick}>
          <Icon as={AddIcon} color="white" mr="2" />
          <Text color="white">Inicio</Text>
        </Flex>
        <Flex align="center" cursor="pointer" mb="2" onClick={() => setView('calendar')}>
          <Icon as={CalendarIcon} color="white" mr="2" />
          <Text color="white">Calendario</Text>
        </Flex>
        <Flex align="center" cursor="pointer" mb="2" onClick={() => setView('reservations')}>
          <Icon as={EmailIcon} color="white" mr="2" />
          <Text color="white">Mis Reservas</Text>
        </Flex>
        <Box>
          {rol === 1 && (
            <Accordion allowToggle>
              <AccordionItem>
                <h1>
                  <AccordionButton>
                    <Flex align="center">
                      <Icon as={WarningIcon} color="white" mr="2" />
                      <Text color="white" mb="0">Administrador</Text>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>
                </h1>
                <AccordionPanel bg="gray.700" p="2">
                  <Flex align="center" cursor="pointer" mb="2" onClick={() => setView('users')}>
                    <Text color="white">Usuarios</Text>
                  </Flex>
                  <Flex align="center" cursor="pointer" mb="2" onClick={() => setView('reservations')}>
                    <Text color="white">Reservas</Text>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          )}
        </Box>
      </Box>
      <Flex align="center" cursor="pointer" mb="2">
        <Link to="/" onClick={handleLogout}>
          <Text color="white">Cerrar Sesión</Text>
        </Link>
      </Flex>
      <Spacer />
    </VStack>
  );
}

export default Sidebar;
