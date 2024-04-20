// Dashboard.js

import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  Spacer,
  StackDivider,
  Icon,
  Text,
  ChakraProvider
} from "@chakra-ui/react";
import { CalendarIcon, EmailIcon, SettingsIcon, EditIcon } from "@chakra-ui/icons";
import UserManagement from '../UserManagment/userManagment'; // Importar el componente de Mantenedor de Usuarios
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    id: 0,
    title: 'Evento 1',
    start: new Date(2024, 3, 1),
    end: new Date(2024, 3, 2),
  },
  {
    id: 1,
    title: 'Evento 2',
    start: new Date(2024, 3, 3),
    end: new Date(2024, 3, 4),
  },
];

function Sidebar({ rol, setView }) {
  
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
        <Flex align="center" cursor="pointer" mb="2">
          <Icon as={SettingsIcon} color="white" mr="2" />
          <Text color="white">Configuración</Text>
        </Flex>
        {/* Mostrar el enlace solo si el rol es 'admin' (1) */}
        {rol === 1 && (
          <Flex align="center" cursor="pointer" mb="2" onClick={() => setView('admin')}>
            <Icon as={EditIcon} color="white" mr="2" />
            <Text color="white">Administrador</Text>
          </Flex>
        )}
      </Box>
      <Spacer />
      <Box mb="4"> {/* Agregar un margen en la parte inferior del último elemento */}
        <Text color="white">&copy; 2024 Company</Text>
      </Box>
    </VStack>
  );
}

function Calendar() {
  return (
    <Box flex="1" p="4">
      <Text fontSize="xl" mb="4">
        Reserva de Horas
      </Text>
      
      <div>
        <BigCalendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
        />
      </div>
    </Box>
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
