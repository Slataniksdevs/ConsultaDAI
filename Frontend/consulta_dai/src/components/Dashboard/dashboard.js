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
} from "@chakra-ui/react";
import { CalendarIcon, EmailIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";
import UserManagement from '../UserManagment/userManagment'; // Importar el componente de Mantenedor de Usuarios
import Calendar from '../Calendar/calendar'; // Importar el componente Calendar
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const myEventsList = [];

function Sidebar({ rol, setView }) {
  const handleLogout = () => {
    // Aquí puedes agregar la lógica para cerrar sesión
    // Por ejemplo, limpiar el almacenamiento local y redirigir al inicio
    localStorage.removeItem("rol");
    // Redirigir al directorio raíz ("/")
    window.location.href = "/";
  };

  const handleInicioClick = () => {
    setView('calendar'); // Cambiar la vista a 'calendar' al hacer clic en Inicio
  };
  
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
          {/* Mostrar el acordeón solo si el rol es 'admin' (1) */}
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
      {/* Enlace de Cerrar Sesión */}
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
  const [view, setView] = useState('calendar'); // Estado para controlar qué vista mostrar

  useEffect(() => {
    // Obtener el rol del almacenamiento local
    const userRol = parseInt(localStorage.getItem('rol')); // Convertir a entero
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
