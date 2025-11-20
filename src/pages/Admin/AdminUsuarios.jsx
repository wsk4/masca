import React, { useState, useEffect } from 'react';
import { Container, Table, Button as BsButton } from 'react-bootstrap';
import Text from '../../components/atoms/Text'; 
import { generarMensaje } from '../../utils/GenerarMensaje'; 

// ----------------------------------------------------
// 🔑 SIMULACIÓN DE DATOS Y SERVICIO PARA USUARIOS 🔑
// ----------------------------------------------------

// Datos iniciales de usuarios (simulando los campos de registro)
let currentUsers = [
    { 
        id: 1, 
        nombre: "Juan Pérez", 
        correo: "juan.perez@example.com", 
        telefono: "912345678", 
        regionName: "Metropolitana", 
        comunaName: "Santiago" 
    },
    { 
        id: 2, 
        nombre: "María Soto", 
        correo: "maria.soto@example.com", 
        telefono: "987654321", 
        regionName: "Valparaíso", 
        comunaName: "Viña del Mar" 
    },
    { 
        id: 3, 
        nombre: "Carlos Araya", 
        correo: "carlos.a@example.com", 
        telefono: "955551111", 
        regionName: "Biobío", 
        comunaName: "Concepción" 
    },
];

// Simulamos un servicio de API para Usuarios
const UsuariosService = {
    /**
     * Obtiene todos los usuarios.
     * Endpoint API: GET /admin/users
     */
    getAllUsers: async () => {
        // Lógica real: return axios.get('/api/admin/users');
        await new Promise(resolve => setTimeout(resolve, 300)); // Simula latencia
        return currentUsers;
    },

    /**
     * Elimina un usuario por su ID.
     * Endpoint API: DELETE /admin/users/{id}
     */
    deleteUser: async (id) => {
        // Lógica real: return axios.delete(`/api/admin/users/${id}`);
        await new Promise(resolve => setTimeout(resolve, 100)); // Simula latencia
        currentUsers = currentUsers.filter(user => user.id !== id);
        return { success: true, id };
    }
};
// ----------------------------------------------------

function AdminUsuarios() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Cargar datos
    const loadData = async () => {
        try {
            setLoading(true);
            const data = await UsuariosService.getAllUsers(); 
            setUsers(data);
        } catch (error) {
            generarMensaje('Error al cargar la lista de usuarios.', 'warning');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    // 2. Función de Eliminación
    const handleDelete = async (id, name) => {
        if (!confirm(`¿Estás seguro de ELIMINAR al usuario: ${name}? Esta acción es irreversible.`)) {
            return;
        }

        try {
            // Llama al servicio para eliminar en la API
            await UsuariosService.deleteUser(id);
            generarMensaje(`¡Usuario ${name} eliminado con éxito!`, 'success');
            
            // Recarga la lista para actualizar la tabla
            await loadData();
        } catch (error) {
            generarMensaje('Error al eliminar el usuario.', 'warning');
        }
    };

    if (loading) {
        return (
            <Container className="my-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Text variant="h1">Gestión de Usuarios (Admin)</Text>
            <Text variant="p" className="mb-4">
                Administración de cuentas de clientes registradas en el sistema.
            </Text>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Región</th>
                        <th>Comuna</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length === 0 ? (
                         <tr>
                            <td colSpan="7" className="text-center text-muted">No hay usuarios registrados.</td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.nombre}</td>
                                <td>{user.correo}</td>
                                <td>{user.telefono}</td>
                                <td>{user.regionName}</td>
                                <td>{user.comunaName}</td>
                                <td>
                                    {/* Botón de Eliminación */}
                                    <BsButton 
                                        variant="danger" 
                                        size="sm" 
                                        onClick={() => handleDelete(user.id, user.nombre)}
                                    >
                                        Eliminar
                                    </BsButton>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default AdminUsuarios;