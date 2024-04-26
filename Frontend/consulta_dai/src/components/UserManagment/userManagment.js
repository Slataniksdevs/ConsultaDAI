import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    user_name: '',
    password: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birth_date: '',
    address: '',
    tipo_usuario: '',
  });

  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/usuarios/get_clientes');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setFormData(userToEdit);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await axios.put(`http://localhost:5000/usuarios/update_cliente/${editingUserId}`, formData);
      } else {
        await axios.post('http://localhost:5000/usuarios/clientes', formData);
      }
      getUsers();
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setFormData({
      user_name: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      birth_date: '',
      address: '',
      tipo_usuario: '',
    });
    setEditingUserId(null);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/usuarios/delete_user/${id}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  // Función para mapear tipo_usuario a roles
  const mapTipoUsuarioToRole = (tipo_usuario) => {
    switch (tipo_usuario) {
      case 1:
        return 'Administrador';
      case 2:
        return 'Soporte';
      case 3:
        return 'Paciente';
      case 4:
        return 'Profesional';
      default:
        return 'No Asignado';
    }
  };

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} p="4">
      {/* Users List */}
      <Box>
        <Card bg="white" shadow="md" borderRadius="md" p="4">
          <CardHeader>
            <Text fontSize="xl" mb="4">Lista de Usuarios</Text>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>User Name</Th>
                  <Th>Nombre</Th>
                  <Th>Email</Th>
                  <Th>Rol</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users.map((user) => (
                  <Tr key={user.id}>
                    <Td>{user.user_name}</Td>
                    <Td>{`${user.first_name} ${user.last_name}`}</Td>
                    <Td>{user.email}</Td>
                    <Td>{mapTipoUsuarioToRole(user.tipo_usuario)}</Td>
                    <Td>
                      <Stack direction={{ base: "column", md: "row" }} spacing={{ base: "2", md: "4" }} justify="flex-end">
                        <Button colorScheme="blue" onClick={() => handleEdit(user.id)}>
                          Editar
                        </Button>
                        <Button colorScheme="red" onClick={() => deleteUser(user.id)}>
                          Eliminar
                        </Button>
                      </Stack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Box>

      {/* User Form */}
      <Box>
        <Card bg="white" shadow="md" borderRadius="md" p="4">
          <CardHeader>
            <Text fontSize="xl" mb="4">{editingUserId ? 'Editar Usuario' : 'Registrar Usuario'}</Text>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <Stack spacing="4">
                <FormControl id="user_name">
                  <FormLabel>User Name</FormLabel>
                  <Input
                    type="text"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="first_name">
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="last_name">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="phone">
                  <FormLabel>Phone</FormLabel>
                  <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="birth_date">
                  <FormLabel>Birth Date</FormLabel>
                  <Input
                    type="date"
                    name="birth_date"
                    value={formData.birth_date}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="address">
                  <FormLabel>Address</FormLabel>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl id="tipo_usuario">
                  <FormLabel>Tipo Usuario</FormLabel>
                  <Input
                    type="number"  
                    name="tipo_usuario"
                    value={formData.tipo_usuario}
                    onChange={handleChange}
                  />
                </FormControl>
              </Stack>
              <Stack direction={{ base: "column", md: "row" }} spacing={{ base: "2", md: "4" }} mt="4">
                <Button type="submit" colorScheme="teal" flex="1">
                  {editingUserId ? 'Guardar Cambios' : 'Registrar Usuario'}
                </Button>
                <Button type="button" onClick={clearForm} flex="1">
                  Cancelar
                </Button>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Box>
    </Grid>
  );
}

export default UserManagement;
