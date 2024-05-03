// ReservaModal.js
import React, { useState, useEffect } from "react";
import {
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
import axios from 'axios';
import bookingManagment from '../../api/bookingManagment';

function ReservaModal({ isOpen, onClose, onAddEvent, selectedDate, date }) {
  const [userName, setUserName] = useState(""); // Inicializamos userName vacío
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Obtener el nombre de usuario del localStorage al cargar el componente
    const storedUserName = localStorage.getItem("user_name");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []); // El efecto se ejecuta solo una vez al cargar el componente

  function formatDate(date) {
    return date.toISOString().split('T')[0]; // Obtiene solo la parte de la fecha en formato 'YYYY-MM-DD'
  }
  
  function formatTime(time) {
    return time.toISOString().split('T')[1].split('.')[0]; // Obtiene solo la parte de la hora en formato 'HH:MM:SS'
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      userName,
      telefono,
      email,
    };

    // Llamar a la función onAddEvent pasando los datos del formulario y la fecha seleccionada
    onAddEvent(formData, selectedDate);

    // Limpiar los campos del formulario después de enviar
    setTelefono("");
    setEmail("");

    formData = {
      user_name: userName,
      fecha_reserva: formatDate(selectedDate), // Formatea la fecha
      hora_inicio: formatTime(date.start), // Formatea la hora de inicio
      hora_termino: formatTime(date.end), // Formatea la hora de termino
      telefono: telefono,
      email: email
    };
    
    const token = localStorage.getItem("token");
    
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/reserva/servicio`, formData, config);
    } catch (error) {
      console.error("nuevo error: ", error);
    }


  };



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Reservar</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={userName}
                readOnly // Hacer el campo de nombre de usuario no editable
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Teléfono</FormLabel>
              <Input
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Reservar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ReservaModal;
