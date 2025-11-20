import React, { useState, useEffect } from 'react';
import { Container, Table, Button as BsButton } from 'react-bootstrap';
import Text from '../../../components/atoms/Text'; 
import { generarMensaje } from '../../../utils/GenerarMensaje'; // Asumimos esta utilidad existe

// --- 🔑 DATOS SIMULADOS (Para fines de la lista) 🔑 ---
const marcasData = [
    { id: 1, nombre: "Chanel" },
    { id: 2, nombre: "Dior" },
    { id: 3, nombre: "Paco Rabanne" },
    { id: 4, nombre: "Calvin Klein" }
];

// Productos con brandId
const productosData = [
    { id: 101, name: "N°5 Eau de Parfum", price: 95000, stock: 50, brandId: 1, image: "/img/p101.webp" },
    { id: 102, name: "Sauvage Elixir", price: 82000, stock: 75, brandId: 2, image: "/img/p102.webp" },
    { id: 103, name: "One Million", price: 65000, stock: 60, brandId: 3, image: "/img/p103.webp" },
    { id: 104, name: "CK One", price: 35000, stock: 120, brandId: 4, image: "/img/p104.webp" }
];
// ----------------------------------------------------

function ListarPerfume() {
    const [perfumes, setPerfumes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función auxiliar para obtener el nombre de la marca por ID
    const getBrandName = (brandId) => {
        const marca = marcasData.find(m => m.id === brandId);
        return marca ? marca.nombre : 'Desconocida';
    };

    // Lógica de carga de datos (simulación de llamada a la API)
    useEffect(() => {
        const loadData = async () => {
            // Lógica real: Aquí llamarías a un PerfumesService.getAll()
            await new Promise(resolve => setTimeout(resolve, 500)); // Simula latencia
            setPerfumes(productosData);
            setLoading(false);
        };
        loadData();
    }, []);

    // Funciones de acción de la tabla (solo simuladas, el manejo real es en HomePerfume.jsx)
    const handleEdit = (id) => {
        generarMensaje(`Navegando a edición del ID: ${id}`, 'info');
        // Lógica real: navigate('/admin/perfumes/edit/' + id);
    };

    const handleDelete = (id) => {
        if (window.confirm(`¿Seguro que desea eliminar el perfume ID ${id}?`)) {
            generarMensaje(`Eliminando perfume ID: ${id} (simulado)`, 'success');
            // Lógica real: PerfumesService.delete(id); y luego recargar la lista.
            setPerfumes(perfumes.filter(p => p.id !== id));
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
            <Text variant="h1">Listado General de Perfumes (Admin)</Text>
            <Text variant="p" className="mb-4">
                Vista de solo lectura y acceso a acciones de gestión para los productos en el inventario.
            </Text>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {perfumes.map((perfume) => (
                        <tr key={perfume.id}>
                            <td>{perfume.id}</td>
                            <td>{perfume.name}</td>
                            <td>{getBrandName(perfume.brandId)}</td>
                            <td>{perfume.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                            <td>{perfume.stock}</td>
                            <td>
                                <BsButton 
                                    variant="warning" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => handleEdit(perfume.id)}
                                >
                                    Editar
                                </BsButton>
                                <BsButton 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={() => handleDelete(perfume.id)}
                                >
                                    Eliminar
                                </BsButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default ListarPerfume;