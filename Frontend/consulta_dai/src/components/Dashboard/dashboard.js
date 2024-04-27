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
  Image,
} from "@chakra-ui/react";
import { ArrowRightIcon, ArrowLeftIcon, AddIcon, CalendarIcon, EmailIcon, WarningIcon } from "@chakra-ui/icons";
import Calendar from '../Calendar/calendar';
import UserManagement from '../UserManagment/userManagment';
import ReservaModal from "../ReservaModal/reservaModal";
import backgroundImage from '../../static/Imagenes/jacques-lacan-3.jpg';

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
      bg="gray.700" // Color claro para el fondo
      h="100vh"
      w={{ base: isOpen ? "250px" : "60px", md: "250px" }}
      transition="width 0.3s"
      alignItems="flex-start"
      py="4"
      px="2"
      borderRightWidth="10px" // Borde solo en el lado derecho
      borderRightColor="black" // Borde negro para definición
      position={{ base: "fixed", md: "relative" }}
      zIndex="999"
    >
      <Box display={{ base: "block", md: "none" }} onClick={onToggle} cursor="pointer">
        {isOpen ? (
          <ArrowLeftIcon color="red.500" />
        ) : (
          <ArrowRightIcon color="red.500" />
        )}
      </Box>
      <Box display={{ base: isOpen ? "block" : "none", md: "block" }} bg="gray.700" borderRadius="20px"> {/* Cambio de color a un tono más oscuro */}
        <Box mb="4">
          <Text fontSize="lg" fontWeight="bold" color="white" textAlign="center">
            Consulta Arbeit
          </Text>
        </Box>
        <Box bg="gray.700" borderRadius="lg" p="2" mb="4"> {/* Cambio de color a un tono más oscuro */}
          <Flex
            direction={isOpen ? "column" : "row"}
            align="center"
            cursor="pointer"
            mb="2"
            onClick={handleInicioClick}
            _hover={{ bg: "gray.800" }} // Cambiar el color al pasar el mouse
            borderRadius="lg" // Bordes menos redondeados
            p="2"
            size="lg"
          >
            <Icon as={AddIcon} color="white" mr={isOpen ? "0" : "2"} /> {/* Icono más claro */}
            <Text color="white" ml={isOpen ? "0" : "2"}>Inicio</Text> {/* Texto más claro */}
          </Flex>
          <Flex
            align="center"
            cursor="pointer"
            mb="2"
            onClick={() => setView('calendar')}
            _hover={{ bg: "gray.800" }}
            borderRadius="lg"
            p="2"
            size="lg"
          >
            <Icon as={CalendarIcon} color="white" mr={isOpen ? "0" : "2"} />
            <Text color="white" ml={isOpen ? "0" : "2"}>Calendario</Text>
          </Flex>
          <Flex
            align="center"
            cursor="pointer"
            mb="2"
            onClick={() => setView('reservations')}
            _hover={{ bg: "gray.800" }}
            borderRadius="lg"
            p="2"
            size="lg"
          >
            <Icon as={EmailIcon} color="white" mr={isOpen ? "0" : "2"} />
            <Text color="white" ml={isOpen ? "0" : "2"}>Mis Reservas</Text>
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
                      _hover={{ bg: "gray.800" }}
                      borderRadius="lg"
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
                      _hover={{ bg: "gray.800" }}
                      borderRadius="lg"
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
        <Flex align="center" cursor="pointer" mb="2" mt={isOpen ? "auto" : "4"}>
          <Link to="/" onClick={handleLogout}>
            <Text color="white">Cerrar Sesión</Text>
          </Link>
        </Flex>
        <Image
          src={backgroundImage}
          alt="Lacan"
          borderRadius="lg" // Bordes menos redondeados
          objectFit="cover"
          boxSize={{ base: "100%", md: "auto" }}
        />
      </Box>
      <Spacer />
    </VStack>
  );
}

function Dashboard() {
  const [rol, setRol] = useState(null);
  const [view, setView] = useState('calendar');
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const userRol = parseInt(localStorage.getItem('rol'));
    setRol(userRol);
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const handleAddEvent = (formData) => {
    // Aquí agregarías la lógica para agregar el evento al calendario
    console.log("Agregar evento:", formData);
  };

  return (
    <ChakraProvider>
      
      <Flex bg="gray.700" // Color claro para el fondo
      hv=""
      borderWidth="10px" // Bordes más gruesos
      borderColor="black" // Borde negro para definición
      borderRadius="lg" // Bordes menos redondead
      position={{ base: "fixed", md: "relative" }}
      zIndex="999">
        <Sidebar rol={rol} setView={setView} />
        {view === 'calendar' ? (
          <Calendar userData={userData} onAddEvent={handleAddEvent} />
        ) : (
          <UserManagement />
        )}
        <ReservaModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onAddEvent={handleAddEvent}
          selectedDate={null}
        />
      </Flex>
    </ChakraProvider>
  );
}

export default Dashboard;
