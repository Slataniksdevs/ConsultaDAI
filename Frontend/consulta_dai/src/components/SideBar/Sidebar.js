import React from "react";
import { Box, Flex, Text, VStack, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Icon, Image, Link, Spacer, useMediaQuery } from "@chakra-ui/react";
import { HamburgerIcon, AddIcon, CalendarIcon, EmailIcon, WarningIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";
import backgroundImage from '../../static/Imagenes/jacques-lacan-3.jpg';
import { Link as RouterLink } from 'react-router-dom';

function SideBar({ rol, setView }) {
    const { isOpen, onToggle } = useDisclosure();
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const handleInicioClick = () => {
        setView('calendar');
        if (isOpen) {
            onToggle();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("rol");
        window.location.href = "/";
    };

    return (
        <VStack
            bg="gray.700"
            h="100vh" // Usar toda la altura de la pantalla
            w={{ base: isMobile ? "100%" : isOpen ? "250px" : "60px", md: "250px" }} // Ajustar el ancho en dispositivos móviles
            transition="width 0.3s"
            alignItems="flex-start"
            py="4"
            px="2"
            borderRightWidth="10px"
            borderRightColor="black"
            position={{ base: "fixed", md: "relative" }}
            zIndex="999"
        >
            <Box display={{ base: isMobile ? "block" : "none", md: "block" }} onClick={onToggle} cursor="pointer">
                <HamburgerIcon color="red.500" />
            </Box>
            <Box display={{ base: isOpen ? "block" : "none", md: "block" }} bg="gray.700" borderRadius="20px">
                <Box mb="4">
                    <Text fontSize="lg" fontWeight="bold" color="white" textAlign="center">
                        Consulta Arbeit
                    </Text>
                </Box>
                <Box bg="gray.700" borderRadius="lg" p="2" mb="4">
                    <Flex
                        direction={isOpen ? "column" : "row"}
                        align="center"
                        cursor="pointer"
                        mb="2"
                        onClick={handleInicioClick}
                        _hover={{ bg: "gray.800" }}
                        borderRadius="lg"
                        p="2"
                        size="lg"
                    >
                        <Icon as={AddIcon} color="white" mr={isOpen ? "0" : "2"} />
                        <Text color="white" ml={isOpen ? "0" : "2"}>Inicio</Text>
                    </Flex>
                    <Flex
                        align="center"
                        cursor="pointer"
                        mb="2"
                        onClick={() => setView('calendar')}
                        _hover={{ bg: "gray.800" }}
                        borderRadius="lg"
                        p="2"
                        size="lg"
                    >
                        <Icon as={CalendarIcon} color="white" mr={isOpen ? "0" : "2"} />
                        <Text color="white" ml={isOpen ? "0" : "2"}>Calendario</Text>
                    </Flex>
                    <Flex
                        align="center"
                        cursor="pointer"
                        mb="2"
                        onClick={() => setView('reservations')}
                        _hover={{ bg: "gray.800" }}
                        borderRadius="lg"
                        p="2"
                        size="lg"
                    >
                        <Icon as={EmailIcon} color="white" mr={isOpen ? "0" : "2"} />
                        <Text color="white" ml={isOpen ? "0" : "2"}>Mis Reservas</Text>
                    </Flex>
                    <Box>
                        {rol === 1 && (
                            <Accordion allowToggle>
                                <AccordionItem>
                                    <h1>
                                        <AccordionButton>
                                            <Flex align="center">
                                                <Icon as={WarningIcon} color="white" mr="2" />
                                                <Text color="white" mb="0">Administrador</Text>
                                            </Flex>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h1>
                                    <AccordionPanel bg="gray.700" p="2">
                                        <Flex
                                            align="center"
                                            cursor="pointer"
                                            mb="2"
                                            onClick={() => setView('users')}
                                            _hover={{ bg: "gray.800" }}
                                            borderRadius="lg"
                                            p="2"
                                            size="lg"
                                        >
                                            <Text color="white">Usuarios</Text>
                                        </Flex>
                                        <Flex
                                            align="center"
                                            cursor="pointer"
                                            mb="2"
                                            onClick={() => setView('bookings')}
                                            _hover={{ bg: "gray.800" }}
                                            borderRadius="lg"
                                            p="2"
                                            size="lg"
                                        >
                                            <Text color="white">Reservas</Text>
                                        </Flex>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        )}
                    </Box>
                </Box>
                <Flex align="center" cursor="pointer" mb="2" mt={isOpen ? "auto" : "4"}>
                    <Link as={RouterLink} to="/" onClick={handleLogout}>
                        <Text color="white">Cerrar Sesión</Text>
                    </Link>
                </Flex>
                <Image
                    src={backgroundImage}
                    alt="Lacan"
                    borderRadius="lg"
                    objectFit="cover"
                    boxSize={{ base: "100%", md: "auto" }}
                />
            </Box>
            <Spacer />
        </VStack>
    );
}

export default SideBar;
