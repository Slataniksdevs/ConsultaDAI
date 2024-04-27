import React, { useState } from "react";
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

function ReservaModal({ isOpen, onClose, onSubmit, selectedDate }) {
  const [user_name, setUserName] = useState("");
  const userName = localStorage.getItem('user_name' , user_name);
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      user_name,
      telefono,
      email,
      fecha_reserva: selectedDate, 
    };

    // Llamar a la función onSubmit pasando los datos del formulario
    onSubmit(formData);

    // Limpiar los campos del formulario después de enviar
    setUserName("");
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
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nombre Usuario</FormLabel>
              <Input
                placeholder="Nombre de Usuario"
                value=''
                onChange={(e) => setUserName(e.target.value)}
                disable
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
            <FormControl mt={4}>
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
