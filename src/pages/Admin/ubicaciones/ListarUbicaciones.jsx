import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/molecules/DynamicTable";
import { useAuth } from "../../../context/AuthContext";
import DireccionService from "../../../service/DireccionService"; 
import CrearEditarUbicacion from "./CrearEditarUbicaciones";
import { generarMensaje } from "../../../utils/GenerarMensaje";
import Button from "../../../components/atoms/Button";

function ListarUbicaciones() {
    const { user } = useAuth();
    const [direcciones, setDirecciones] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDirecciones();
    }, []);

    const fetchDirecciones = async () => {
        try {
            const data = await DireccionService.getAll();
            setDirecciones(data || []);
        } catch (error) {
            console.error(error);
            generarMensaje("Error al cargar direcciones", "error");
        }
    };

    const handleCreate = () => { 
        setModalData({}); 
        setOpenModal(true); 
    };

    const handleEdit = (d) => { 
        setModalData(d); 
        setOpenModal(true); 
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar esta dirección?")) return;

        try {
            await DireccionService.delete(id);
            generarMensaje("Dirección eliminada", "success");
            fetchDirecciones();
        } catch (error) {
            console.error(error);
            generarMensaje("Error al eliminar la dirección", "error");
        }
    };

    const handleSubmit = async (data) => {
        setLoading(true);
        try {
            if (data.id) {
                await DireccionService.update(data.id, data);
                generarMensaje("Dirección actualizada", "success");
            } else {
                await DireccionService.create(data);
                generarMensaje("Dirección creada", "success");
            }
            fetchDirecciones();
            setOpenModal(false);
        } catch (error) { 
            console.error(error);
            generarMensaje("Error en la operación", "error"); 
        } finally { 
            setLoading(false); 
        }
    };

    // Validación de seguridad simple
    if (!user) return <div className="p-8">Cargando usuario...</div>;

    return (
        <main className="p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white border-l-4 border-white pl-4">
                Gestión de Direcciones
            </h1>
            
            <div className="mb-6">
                <Button 
                    onClick={handleCreate} 
                    text="Crear dirección" 
                    className="bg-white text-black hover:bg-gray-200 border-none"
                />
            </div>

            <DynamicTable 
                columns={["ID", "Calle", "Número", "Comuna", "Acciones"]} 
                data={direcciones.map(d => [
                    d.id, 
                    d.calle,
                    d.numero || "S/N",
                    d.comuna?.nombre || "Sin Comuna",
                    <div key={d.id} className="flex gap-2">
                        <Button 
                            onClick={() => handleEdit(d)} 
                            text="Editar"
                            className="!py-1 !px-3 bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                        />
                        <Button 
                            onClick={() => handleDelete(d.id)} 
                            text="Eliminar"
                            className="!py-1 !px-3 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        />
                    </div>
                ])} 
            />
            
            <CrearEditarUbicacion 
                isOpen={openModal} 
                onClose={() => setOpenModal(false)} 
                onSubmit={handleSubmit} 
                initialData={modalData} 
                loading={loading} 
            />
        </main>
    );
}

export default ListarUbicaciones;