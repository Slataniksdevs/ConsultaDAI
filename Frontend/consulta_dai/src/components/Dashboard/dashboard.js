import React from 'react';
import { Box, Heading, Text, Flex, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
import {Calendar, dayjsLocalizer} from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import "dayjs/locale/es";

dayjs.locale("es")

function Dashboard() {

   const localizer = dayjsLocalizer(dayjs)
   const messages = {
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
};


  return (
    <Box p="4">
      <Heading as="h1" size="xl" mb="4">¡Hola Mundo! Este es el Dashboard.</Heading>
      <Calendar 

      messages={messages}
      localizer={localizer}
        style={{
          
          height:500,
          widtg:500
          }} />
      
      <Text fontSize="lg">Bienvenido al calendario Aquí puedes ver un resumen del uso de la consulta .</Text>
    </Box>
  );
}

export default Dashboard;
