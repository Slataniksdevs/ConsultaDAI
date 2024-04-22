import React, { useState, useEffect } from "react";
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
import axios from 'axios';

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
  const [formData, setFormData] = useState({
    user_name: "",
    telefono: "",
    email: "",
  });

  useEffect(() => {
    // Función para obtener los datos del usuario por su nombre de usuario
    const getUserData = async (username) => {
      try {
        const response = await axios.get(`http://localhost:5000/usuarios/get_user_by_username/${username}`);
        const userData = response.data;
        setFormData({
          user_name: userData.user_name || "",
          telefono: userData.telefono || "",
          email: userData.email || "",
        });
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };

    // Obtener el nombre de usuario del estado local (localStorage)
    const loggedInUserName = localStorage.getItem("user_name");

    // Si hay un nombre de usuario, obtener los datos del usuario por su nombre de usuario
    if (loggedInUserName) {
      getUserData(loggedInUserName);
    }
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const handleReservaSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario de reserva al servidor
    console.log("Datos de la reserva:", formData);
    setModalOpen(false); // Cerrar el modal después de enviar
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
          selectable
          onSelectEvent={handleEventClick} // Manejar clic en un evento
          onSelectSlot={() => setModalOpen(true)} // Manejar clic en un espacio vacío
        />
      </div>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reservar</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleReservaSubmit}>
            <ModalBody>
              <FormControl>
                <FormLabel>Nombre de Usuario</FormLabel>
                <Input
                  placeholder="Nombre de Usuario"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                  disabled // Deshabilitar para que no se pueda editar
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  placeholder="Teléfono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Reservar
              </Button>
              <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Calendar;
