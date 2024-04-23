import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  VStack,
  Spacer,
  StackDivider,
  Icon,
  Text,
  ChakraProvider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  IconButton,
} from "@chakra-ui/react";
import { CalendarIcon, EmailIcon, AddIcon, WarningIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import UserManagement from '../UserManagment/userManagment'; // Importar el componente de Mantenedor de Usuarios
import Calendar from '../Calendar/calendar'; // Importar el componente Calendar
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const myEventsList = [];

function Sidebar({ rol, setView, isOpen, onToggle }) {
  const handleLogout = () => {
    localStorage.removeItem("rol");
    window.location.href = "/";
  };

  const handleInicioClick = () => {
    setView('calendar');
    if (isOpen) {
      onToggle(); // Cerrar el sidebar al cambiar de vista
    }
  };

  return (
    <VStack
      bg="gray.800"
      h="100%"
      w={{ base: isOpen ? "100%" : "0", md: "250px" }} // Ancho del sidebar
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
      transition="width 0.3s ease" // Animación de transición
    >
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="white" mb="4" pl="12"onClick={handleInicioClick}>
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
                      <Text color="white" mb="0">Administrador</Text> {/* Ajuste de margen para alinear con otros */}
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

function Dashboard() {
  const [rol, setRol] = useState(null);
  const [view, setView] = useState('calendar');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const userRol = parseInt(localStorage.getItem('rol'));
    setRol(userRol);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChakraProvider>
      <Flex>
        <IconButton
          aria-label="Abrir Sidebar"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          onClick={toggleSidebar}
          display={{ base: "block", md: "none" }}  
          color="black"
          pos="fixed"
          top="3"
          left="2"
          zIndex="99"
          fontSize="22px" 
        />
        <Box
          w={{ base: isOpen ? "100vw" : "0", md: isOpen ? "100px" : "0" }} // Ancho del sidebar
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          zIndex="98"
          display={{ base: isOpen ? "block" : "none", md: "none" }} // Mostrar en dispositivos móviles
          onClick={toggleSidebar} 
        />
        <Box flex="1" ml={{ base: 0, md: isOpen ? '250px' : '0' }}>
          <Sidebar rol={rol} setView={setView} isOpen={isOpen} onToggle={toggleSidebar} />
        </Box>
        <Box flex="2">
          {view === 'calendar' ? (
            <Calendar />
          ) : (
            <UserManagement />
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default Dashboard;
