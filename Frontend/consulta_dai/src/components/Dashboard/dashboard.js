import React, { useEffect, useState } from "react";
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
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importar el locale de español para moment.js
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

function Sidebar({ rol }) {
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
        {rol === '1' && (
          <Flex align="center" cursor="pointer" mb="2">
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
            allDay: "Todo el día",
            previous: "Anterior",
            next: "Siguiente",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "Sin eventos"
          }}
        />
      </div>
    </Box>
  );
}

function Dashboard() {
  const [rol, setRol] = useState(null);

  useEffect(() => {
    // Obtener el rol del almacenamiento local
    const userRol = localStorage.getItem('rol');
    setRol(userRol);
  }, []);

  // Configuración inicial para establecer moment en español
  useEffect(() => {
    moment.locale('es');
  }, []);

  return (
    <ChakraProvider>
      <Flex>
        <Sidebar rol={rol} />
        <Calendar />
      </Flex>
    </ChakraProvider>
  );
}

export default Dashboard;
