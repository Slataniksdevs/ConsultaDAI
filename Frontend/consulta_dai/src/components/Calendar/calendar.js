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
} from "@chakra-ui/react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ReservaModal from "../ReservaModal/reservaModal";
import { useMediaQuery } from "react-responsive";

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

function Calendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleReservaSubmit = (formData) => {
    // Aquí puedes enviar los datos del formulario de reserva al servidor
    console.log("Datos de la reserva:", formData);
    setModalOpen(false); // Cerrar el modal después de enviar
  };

  return (
    <Box flex="1" p="4">
      <Text fontSize="xl" mb="4">
        Calendario de Reservas
      </Text>
      <div>
        <BigCalendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: isMobile ? 300 : 500 }}
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
          onSelectSlot={handleSelectSlot} // Manejar clic en un espacio vacío
        />
      </div>
      <Modal isOpen={modalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reservar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReservaModal
              isOpen={modalOpen}
              onClose={handleModalClose}
              onSubmit={handleReservaSubmit}
              selectedDate={selectedDate}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Calendar;
