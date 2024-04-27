// En el componente Calendar
import React, { useState } from "react";
import {
  Box,
  Text,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReservaModal from "../ReservaModal/reservaModal";

const localizer = momentLocalizer(moment);

const myEventsList = [
  {
    id: 1,
    title: "Reserva 1",
    start: new Date(2024, 3, 16, 10, 0),
    end: new Date(2024, 3, 16, 12, 0),
  },
  {
    id: 2,
    title: "Reserva 2",
    start: new Date(2024, 3, 18, 13, 0),
    end: new Date(2024, 3, 18, 15, 0),
  },
];

function Calendar({ userData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleEventClick = (event) => {
    setSelectedDate(event.start);
    setModalOpen(true);
  };

  const handleReservaSubmit = (formData) => {
    // Aquí puedes enviar los datos de la reserva al backend
    console.log("Datos de la reserva:", formData);
    setModalOpen(false); // Cerrar el modal después de enviar
  };

  return (
    <Box flex="1" p="4">
      <Text fontSize="xl" mb="4" pl="4" >
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
          selectable
          onSelectEvent={handleEventClick} // Manejar clic en un evento
          onSelectSlot={() => setModalOpen(true)} // Manejar clic en un espacio vacío
          min={new Date().setHours(8, 0, 0)} // Horario mínimo: 8 am
          max={new Date().setHours(18, 0, 0)} // Horario máximo: 6 pm
        />
      </div>
      <ReservaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleReservaSubmit}
        selectedDate={selectedDate}
        userData={userData} // Pasa userData al componente ReservaModal
      />
    </Box>
  );
}

export default Calendar;
