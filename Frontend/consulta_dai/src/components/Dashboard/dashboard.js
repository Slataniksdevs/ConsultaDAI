import React, { useState, useEffect } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";

function Dashboard() {
  const [rol, setRol] = useState(null);
  const [view, setView] = useState('calendar');
  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const userRol = parseInt(localStorage.getItem('rol'));
    setRol(userRol);
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const handleAddEvent = (formData) => {
    // Aquí agregarías la lógica para agregar el evento al calendario
    console.log("Agregar evento:", formData);
  };

  return (
    <ChakraProvider>
      <Flex bg="gray.700" // Color claro para el fondo
        hv=""
        borderWidth="10px" // Bordes más gruesos
        borderColor="black" // Borde negro para definición
        borderRadius="lg" // Bordes menos redondeados
        position={{ base: "fixed", md: "relative" }}
        zIndex="999">
        {/* Renderizado condicional basado en el estado 'view' */}
        {/* Puedes agregar aquí el contenido que desees */}
      </Flex>
    </ChakraProvider>
  );
}

export default Dashboard;
