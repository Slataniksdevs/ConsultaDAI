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
  useDisclosure,
} from "@chakra-ui/react";
import { CalendarIcon, EmailIcon, AddIcon, WarningIcon, ArrowRightIcon, ArrowLeftIcon } from "@chakra-ui/icons"; 
import UserManagement from '../UserManagment/userManagment'; 
import Calendar from '../Calendar/calendar'; 

function Sidebar({ rol, setView }) {
  const { isOpen, onToggle } = useDisclosure(); 

  const handleLogout = () => {
    localStorage.removeItem("rol");
    window.location.href = "/";
  };

  const handleInicioClick = () => {
    setView('calendar');
    if (isOpen) {
      onToggle();
    }
  };
  
  return (
    <VStack
      bg="gray.800"
      h="100vh"
      w={{ base: isOpen ? "250px" : "0", md: "250px" }} 
      transition="width 0.3s"
      divider={<StackDivider borderColor="gray.700" />}
      alignItems="flex-start"
      py="4"
      px="2"
      position={{ base: "fixed", md: "relative" }} // Posición fija solo en dispositivos móviles
      zIndex="999" 
    >
      <Box display={{ base: "block", md: "none" }} onClick={onToggle} cursor="pointer">
        {isOpen ? (
          <ArrowLeftIcon color="red.500" />
        ) : (
          <ArrowRightIcon color="red.500" />
        )}
      </Box>
      <Box display={{ base: isOpen ? "block" : "none", md: "block" }}>
        <Box>
          <Text fontSize="lg" fontWeight="bold" color="white" mb="4">
            Consulta Arbeit
          </Text>
        </Box>
        <Box>
          <Text color="white" mb="2">
            Menú
          </Text>
          <Flex
            align="center"
            cursor="pointer"
            mb="2"
            onClick={handleInicioClick}
            _hover={{ bg: "gray.700" }} // Cambiar el color de fondo al pasar el mouse
            borderRadius="md" // Agregar bordes redondeados
            p="2" // Añadir un espacio interno
            size="lg" // Ajustar el tamaño en dispositivos móviles
          >
            <Icon as={AddIcon} color="white" mr="2" />
            <Text color="white">Inicio</Text>
          </Flex>
          <Flex
            align="center"
            cursor="pointer"
            mb="2"
            onClick={() => setView('calendar')}
            _hover={{ bg: "gray.700" }}
            borderRadius="md"
            p="2"
            size="lg"
          >
            <Icon as={CalendarIcon} color="white" mr="2" />
            <Text color="white">Calendario</Text>
          </Flex>
          <Flex
            align="center"
            cursor="pointer"
            mb="2"
            onClick={() => setView('reservations')}
            _hover={{ bg: "gray.700" }}
            borderRadius="md"
            p="2"
            size="lg"
          >
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
                    <Flex
                      align="center"
                      cursor="pointer"
                      mb="2"
                      onClick={() => setView('users')}
                      _hover={{ bg: "gray.700" }}
                      borderRadius="md"
                      p="2"
                      size="lg"
                    >
                      <Text color="white">Usuarios</Text>
                    </Flex>
                    <Flex
                      align="center"
                      cursor="pointer"
                      mb="2"
                      onClick={() => setView('reservations')}
                      _hover={{ bg: "gray.700" }}
                      borderRadius="md"
                      p="2"
                      size="lg"
                    >
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
      </Box>
      <Spacer />
    </VStack>
  );
}

function Dashboard() {
  const [rol, setRol] = useState(null);
  const [view, setView] = useState('calendar');

  useEffect(() => {
    const userRol = parseInt(localStorage.getItem('rol'));
    setRol(userRol);
  }, []);

  return (
    <ChakraProvider>
      <Flex>
        <Sidebar rol={rol} setView={setView} />
        {view === 'calendar' ? (
          <Calendar />
        ) : (
          <UserManagement />
        )}
      </Flex>
    </ChakraProvider>
  );
}

export default Dashboard;
