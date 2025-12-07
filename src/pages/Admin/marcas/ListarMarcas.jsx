import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/molecules/DynamicTable";
import { useAuth } from "../../../context/AuthContext";
import MarcaService from "../../../service/MarcaService";
import CrearEditarMarca from "./CrearEditarMarca";
import { generarMensaje } from "../../../utils/GenerarMensaje";
import Button from "../../../components/atoms/Button"; // Se asume que este componente está disponible

function ListarMarcas() {
    const { user } = useAuth();
    const [marcas, setMarcas] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    // Función unificada para obtener marcas
    const fetchMarcas = async () => {
        try {
            const data = await MarcaService.getAll();
            setMarcas(data || []);
        } catch (error) {
            console.error("Error al cargar marcas:", error);
            generarMensaje("Error al cargar marcas", "error");
        }
    };

    useEffect(() => {
        fetchMarcas();
    }, []);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    const handleEdit = (marca) => { setModalData(marca); setOpenModal(true); };

    // ===================================
    // FUNCIÓN: Maneja la eliminación de marca
    // ===================================
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta marca? Esta acción es irreversible.")) return;

        setLoading(true);
        try {
            await MarcaService.delete(id); // Llama al servicio de eliminación
            generarMensaje("Marca eliminada correctamente", "success");
            setOpenModal(false); // Cierra el modal si estaba abierto
            await fetchMarcas();      // Recarga la lista
        } catch (error) {
            console.error("Error al eliminar marca:", error);
            generarMensaje("Error al eliminar la marca", "error");
        } finally {
            setLoading(false);
        }
    };
    // ===================================

    const handleSubmit = async data => {
        setLoading(true);
        try {
            if (data.id) {
                await MarcaService.update(data.id, data);
                generarMensaje("Marca actualizada", "success");
            } else {
                await MarcaService.create(data);
                generarMensaje("Marca creada", "success");
            }
            await fetchMarcas(); // Usa la función de recarga
            setOpenModal(false);
        } catch { 
            generarMensaje("Error en la operación", "error"); 
        } finally { 
            setLoading(false); 
        }
    };

    return (
        <main className="p-6">
            <button onClick={handleCreate} className="mb-5 px-4 py-2 bg-blue-600 text-white rounded">Crear marca</button>
            <DynamicTable 
                columns={["ID", "Nombre", "Acciones"]} 
                data={marcas.map(m => [
                    m.id, 
                    m.nombre,
                    <div key={m.id} className="flex gap-2">
                        {/* Botón Editar */}
                        <button 
                            onClick={() => handleEdit(m)} 
                            className="px-2 py-1 bg-indigo-500 text-white rounded"
                        >
                            Editar
                        </button>
                        {/* Botón Eliminar para acción directa en la tabla */}
                        <Button 
                            onClick={() => handleDelete(m.id)} 
                            text="Eliminar"
                            className="!py-1 !px-3 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        />
                    </div>
                ])} 
            />
            {/* Se pasa la prop onDelete a CrearEditarMarca */}
            <CrearEditarMarca 
                isOpen={openModal} 
                onClose={() => setOpenModal(false)} 
                onSubmit={handleSubmit} 
                onDelete={handleDelete} // <--- FUNCIÓN DE ELIMINAR ASIGNADA
                initialData={modalData} 
                loading={loading} 
            />
        </main>
    );
}
export default ListarMarcas;