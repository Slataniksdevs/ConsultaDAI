import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Badge,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';

const URL = 'http://127.0.0.1:5000/';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const isLargerThan768 = useMediaQuery({ minWidth: 768 });
  const cardBg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    // Función para obtener las reservas
    const fetchBookings = async () => {
      try {
        // Utilizar la URL constante en la solicitud axios
        const response = await axios.get(`${URL}/booking/list_booking`);
        setBookings(response.data);
      } catch (error) {
        setError(error.response.data.error);
      }
    };

    // Llamar a la función para obtener las reservas cuando el componente se monte
    fetchBookings();
  }, []);

  return (
    <VStack spacing={4} w={isLargerThan768 ? '50%' : '100%'}>
      <Box
        w="100%"
        bg={cardBg}
        p={4}
        boxShadow="md"
        borderRadius="md"
      >
        {error && (
          <Text color="red.500" fontWeight="bold" mt={4}>
            {error}
          </Text>
        )}
        <UnorderedList mt={4}>
          {bookings.map((booking) => (
            <ListItem key={booking.id_reserva} mb={4}>
              <Box
                p={4}
                boxShadow="md"
                borderRadius="md"
                bg={cardBg}
              >
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Reserva #{booking.id_reserva}
                </Text>
                <Text>
                  <Badge colorScheme="blue">Nombre :</Badge> {booking.first_name} {booking.last_name}
                </Text>
                <Text>
                  <Badge colorScheme="green">Fecha:</Badge> {booking.fecha_reserva}
                </Text>
                <Text>
                  <Badge colorScheme="purple">Hora de inicio:</Badge>{' '}
                  {booking.hora_inicio}
                </Text>
                <Text>
                  <Badge colorScheme="orange">Hora de término:</Badge>{' '}
                  {booking.hora_termino}
                </Text>
                <Text>
                  <Badge colorScheme="blue">Telefono :</Badge> {booking.telefono} 
                </Text>
                <Text>
                  <Badge colorScheme="blue">Correo Electronico :</Badge> {booking.email} 
                </Text>
                <Text>
                  <Badge colorScheme="blue">Estrado de la reserva :</Badge> {booking.estado} 
                </Text>

              </Box>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </VStack>
  );
}

export default BookingList;
