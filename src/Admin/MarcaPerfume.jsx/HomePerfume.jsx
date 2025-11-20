import React, { useState, useEffect } from 'react';
import Section from '../../../components/templates/Section';
import CreateModal from '../../../components/organisms/CreateModal';
import Button from '../../../components/atoms/Button';
// importamos datos para inicializar (simulación)
import { generarMensaje } from '../../../utils/GenerarMensaje'; 


// ----------------------------------------------------
// 🔑 SIMULACIÓN DE DATOS Y SERVICIO (Siguiendo estructura de Facciones)
// ----------------------------------------------------

// Datos iniciales de perfumes
let currentPerfumes = [
    { id: 101, nombre: "N°5 Eau de Parfum", descripcion: "Floral y elegante", price: 95000, stock: 50, logo: "/img/p101.webp", brandId: 1 },
    { id: 102, nombre: "Sauvage Elixir", descripcion: "Intenso y especiado", price: 82000, stock: 75, logo: "/img/p102.webp", brandId: 2 },
    { id: 103, nombre: "One Million", descripcion: "Ambarino y audaz", price: 65000, stock: 60, logo: "/img/p103.webp", brandId: 3 },
];

// Simulamos un servicio de API para Perfumes (antes FaccionesService)
const PerfumesService = {
    getAllPerfumes: async () => currentPerfumes,
    createPerfume: async (data) => {
        const newId = Math.max(...currentPerfumes.map(p => p.id)) + 1;
        const newPerfume = { id: newId, ...data };
        currentPerfumes.push(newPerfume);
        return newPerfume;
    },
    updatePerfume: async (id, data) => {
        currentPerfumes = currentPerfumes.map(p => p.id === id ? { ...p, ...data } : p);
        return currentPerfumes.find(p => p.id === id);
    },
    deletePerfume: async (id) => {
        currentPerfumes = currentPerfumes.filter(p => p.id !== id);
    }
};

// Simulamos la estructura homeData (asumiendo que tiene la configuración de columnas)
const initialHomeData = [
    {
        title: "Gestión de Stock de Perfumes",
        service: "perfumes", // Nuevo servicio a buscar
        type: "table",
        // Estas columnas son necesarias para que el componente Section renderice bien:
        columns: [ 
            { key: 'nombre', title: 'Nombre' }, 
            { key: 'price', title: 'Precio' }, 
            { key: 'stock', title: 'Stock' },
            { key: 'descripcion', title: 'Descripción' },
        ],
        data: [] // La data se carga en useEffect
    }
];

// Mapeo de inputs para el formulario de Creación/Edición
const createInputs = [
    // Usamos 'nombre' y 'logo' para coincidir con la estructura de 'facción', pero con nuevos placeholders
    { name: "nombre", type: "text", placeholder: "Nombre del Perfume", required: true },
    { name: "descripcion", type: "textarea", placeholder: "Breve descripción", required: true, className: "h-28" },
    { name: "price", type: "number", placeholder: "Precio (CLP)", required: true },
    { name: "stock", type: "number", placeholder: "Stock Inicial", required: true },
    { name: "logo", type: "file" }, // Campo para la imagen del perfume
];

// ----------------------------------------------------

function HomePerfume() {
    const [pageData, setPageData] = useState(initialHomeData);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    // Cambiamos 'editingFaccion' por 'editingPerfume'
    const [editingPerfume, setEditingPerfume] = useState(null); 
 
    const loadData = async () => {
        const updatedData = [...initialHomeData];
        const tableItem = updatedData.find(i => i.service === "perfumes"); // Buscar por "perfumes"

        if (tableItem) {
            try {
                setLoading(true);
                // Llama al servicio de perfumes
                const data = await PerfumesService.getAllPerfumes(); 
                
                // Mapeo de acciones (igual que en facciones)
                const dataWithActions = data.map(perfume => ({
                    ...perfume,
                    // Renombramos las funciones para claridad
                    onEdit: () => handleOpenEdit(perfume), 
                    onDelete: () => handleDelete(perfume.id),
                }));
                tableItem.data = dataWithActions;
            } catch (error) {
                generarMensaje('No se pudieron cargar los perfumes', 'warning');
                tableItem.data = [{ id: "Error", nombre: "Error de conexión" }];
            } finally {
                setLoading(false);
            }
        }
        setPageData(updatedData);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleOpenEdit = (perfume) => {
        setEditingPerfume(perfume);
        setIsModalOpen(true);
    };

    const handleCreate = async (formData) => {
        setSubmitLoading(true);
        try {
            if (editingPerfume) {
                // Lógica de edición
                await PerfumesService.updatePerfume(editingPerfume.id, formData);
                generarMensaje('¡Perfume actualizado con éxito!', 'success');
            } else {
                // Lógica de creación
                await PerfumesService.createPerfume(formData);
                generarMensaje('¡Perfume creado con éxito!', 'success');
            }
            
            // Recargar datos tras la operación
            await loadData();

            setIsModalOpen(false);
            setEditingPerfume(null);
        } catch (error) {
            generarMensaje('Error al guardar el perfume', 'warning');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este perfume?')) return;

        try {
            await PerfumesService.deletePerfume(id);
            generarMensaje('¡Perfume eliminado con éxito!', 'success');
            
            // Recargar datos tras la eliminación
            await loadData();
        } catch (error) {
            generarMensaje('Error al eliminar el perfume', 'warning');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

            {/* Spinner de carga (igual que el original) */}
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                </div>
            )}

            <div className="container py-6 flex justify-end">
                <Button
                    text="Crear Perfume" // Texto adaptado
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md active:scale-95 transition-all"
                />
            </div>

            {/* Muestra la tabla de perfumes */}
            <Section content={pageData} className="container" />

            {/* Modal para Crear/Editar Perfume */}
            <CreateModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingPerfume(null); // Limpiar el estado de edición al cerrar
                }}
                onSubmit={handleCreate}
                inputsConfig={createInputs}
                title={editingPerfume ? "Editar Perfume" : "Crear Nuevo Perfume"}
                submitText={editingPerfume ? "Actualizar" : "Crear"}
                loading={submitLoading}
                initialData={editingPerfume || {}}
            />
        </div>
    );
}

export default HomePerfume;