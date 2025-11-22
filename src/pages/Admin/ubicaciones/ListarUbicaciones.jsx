import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import { useAuth } from "../../context/AuthContext";
import DireccionService from "../../service/DireccionService";
import CrearEditarUbicacion from "./CrearEditarUbicacion";
import { generarMensaje } from "../../utils/GenerarMensaje";

function ListarUbicaciones() {
    const { user } = useAuth();
    const [ubicaciones, setUbicaciones] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        DireccionService.getAll().then(setUbicaciones);
    }, []);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    const handleEdit = u => { setModalData(u); setOpenModal(true); };

    const handleSubmit = async data => {
        setLoading(true);
        try {
            if (data.id) {
                await DireccionService.update(data.id, data);
                generarMensaje("Ubicación actualizada", "success");
            } else {
                await DireccionService.create(data);
                generarMensaje("Ubicación creada", "success");
            }
            setUbicaciones(await DireccionService.getAll());
            setOpenModal(false);
        } catch { generarMensaje("Error en la operación", "error"); }
        finally { setLoading(false); }
    };

    return (
        <main className="p-6">
            <button onClick={handleCreate} className="mb-5 px-4 py-2 bg-blue-600 text-white rounded">Crear ubicación</button>
            <DynamicTable columns={["ID", "Nombre", "Acciones"]} data={ubicaciones.map(u => [
                u.id, u.nombre,
                <button onClick={() => handleEdit(u)} className="px-2 py-1 bg-indigo-500 text-white rounded">Editar</button>
            ])} />
            <CrearEditarUbicacion isOpen={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSubmit} initialData={modalData} loading={loading} />
        </main>
    );
}
export default ListarUbicaciones;
