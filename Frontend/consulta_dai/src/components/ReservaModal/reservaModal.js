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


function ReservaModal({ isOpen, onClose, onAddEvent, selectedDate }) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      userName,
      telefono,
      email,
    };

    // Llamar a la función onAddEvent pasando los datos del formulario y la fecha seleccionada
    onAddEvent(formData, selectedDate);

    // Limpiar los campos del formulario después de enviar
    setTelefono("");
    setEmail("");
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
            <FormControl>
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
