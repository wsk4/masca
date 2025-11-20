import React, { useState, useEffect } from 'react';
import Section from '../../../components/templates/Section';
import CreateModal from '../../../components/organisms/CreateModal';
import Button from '../../../components/atoms/Button';
import { generarMensaje } from '../../../utils/GenerarMensaje'; 

// ----------------------------------------------------
// 🔑 SIMULACIÓN DE DATOS Y SERVICIO PARA COMUNAS 🔑
// ----------------------------------------------------

// Simulamos la gestión para la Región Metropolitana (ID 1)
const REGION_ID_TO_MANAGE = 1; 
const REGION_NAME_TO_MANAGE = "Región Metropolitana"; 

// Datos iniciales de Comunas
let currentComunas = [
    { id: 101, regionId: 1, nombre: "Santiago", costoEnvio: 3500 },
    { id: 102, regionId: 1, nombre: "Providencia", costoEnvio: 3000 },
    { id: 103, regionId: 1, nombre: "Maipú", costoEnvio: 4000 },
    { id: 201, regionId: 2, nombre: "Valparaíso", costoEnvio: 5000 }, // No debería aparecer en este listado simulado, pero está en el mock.
];

// Extensión del servicio de Ubicaciones para CRUD de Comunas
const UbicacionesService = {
    // Método para obtener comunas de la API (por región)
    getComunasByRegion: async (regionId) => {
        // Lógica real: return axios.get(`/api/regiones/${regionId}/comunas`);
        const comunasFiltradas = currentComunas.filter(c => c.regionId === regionId);
        return comunasFiltradas;
    },
    // Método para crear comuna
    createComuna: async (data) => {
        // Lógica real: return axios.post(`/api/comunas`, data);
        const newId = Math.max(...currentComunas.map(c => c.id)) + 1;
        const newComuna = { id: newId, ...data };
        currentComunas.push(newComuna);
        return newComuna;
    },
    // Método para actualizar comuna
    updateComuna: async (id, data) => {
        // Lógica real: return axios.put(`/api/comunas/${id}`, data);
        currentComunas = currentComunas.map(c => c.id === id ? { ...c, ...data } : c);
        return currentComunas.find(c => c.id === id);
    },
    // Método para eliminar comuna
    deleteComuna: async (id) => {
        // Lógica real: return axios.delete(`/api/comunas/${id}`);
        currentComunas = currentComunas.filter(c => c.id !== id);
    }
};

// Estructura de datos para el componente Section
const initialHomeData = [
    {
        title: `Comunas Activas en ${REGION_NAME_TO_MANAGE}`,
        service: "comunas",
        type: "table",
        columns: [ 
            { key: 'nombre', title: 'Comuna' }, 
            { key: 'costoEnvio', title: 'Costo Envío' }, 
        ],
        data: [] 
    }
];

// Mapeo de inputs para el formulario de Creación/Edición de Comunas
const createInputs = [
    { name: "nombre", type: "text", placeholder: "Nombre de la Comuna", required: true },
    { name: "costoEnvio", type: "number", placeholder: "Costo de Envío (CLP)", required: true },
];

// ----------------------------------------------------

function AdminComunas() {
    const [pageData, setPageData] = useState(initialHomeData);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingComuna, setEditingComuna] = useState(null); 
 
    const loadData = async () => {
        const updatedData = [...initialHomeData];
        const tableItem = updatedData.find(i => i.service === "comunas");

        if (tableItem) {
            try {
                setLoading(true);
                // Carga solo las comunas de la región predefinida
                const data = await UbicacionesService.getComunasByRegion(REGION_ID_TO_MANAGE); 
                
                const dataWithActions = data.map(comuna => ({
                    ...comuna,
                    onEdit: () => handleOpenEdit(comuna), 
                    onDelete: () => handleDelete(comuna.id),
                }));
                tableItem.data = dataWithActions;
            } catch (error) {
                generarMensaje('No se pudieron cargar las comunas', 'warning');
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

    const handleOpenEdit = (comuna) => {
        setEditingComuna(comuna);
        setIsModalOpen(true);
    };

    const handleCreate = async (formData) => {
        setSubmitLoading(true);
        try {
            // Aseguramos que la comuna se asocie a la región que estamos administrando
            const dataToSave = { ...formData, regionId: REGION_ID_TO_MANAGE };

            if (editingComuna) {
                await UbicacionesService.updateComuna(editingComuna.id, dataToSave);
                generarMensaje('¡Comuna actualizada con éxito!', 'success');
            } else {
                await UbicacionesService.createComuna(dataToSave);
                generarMensaje('¡Comuna creada con éxito!', 'success');
            }
            
            await loadData();

            setIsModalOpen(false);
            setEditingComuna(null);
        } catch (error) {
            generarMensaje('Error al guardar la comuna', 'warning');
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Estás seguro de eliminar esta comuna?')) return;

        try {
            await UbicacionesService.deleteComuna(id);
            generarMensaje('¡Comuna eliminada con éxito!', 'success');
            
            await loadData();
        } catch (error) {
            generarMensaje('Error al eliminar la comuna', 'warning');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">

            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
                </div>
            )}

            <div className="container py-6 flex justify-end">
                <Button
                    text={`Crear Comuna en ${REGION_NAME_TO_MANAGE}`}
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md active:scale-95 transition-all"
                />
            </div>

            <Section content={pageData} className="container" />

            <CreateModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingComuna(null); 
                }}
                onSubmit={handleCreate}
                inputsConfig={createInputs}
                title={editingComuna ? "Editar Comuna" : "Crear Nueva Comuna"}
                submitText={editingComuna ? "Actualizar" : "Crear"}
                loading={submitLoading}
                initialData={editingComuna || {}}
            />
        </div>
    );
}

export default AdminComunas;