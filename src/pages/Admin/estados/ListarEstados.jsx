import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import EstadoCompraService from "../../service/EstadoCompraService";
import CrearEditarEstado from "./CrearEditarEstado";
import { generarMensaje } from "../../utils/GenerarMensaje";

function ListarEstados() {
    const [estados, setEstados] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => { EstadoCompraService.getAll().then(setEstados); }, []);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    const handleEdit = e => { setModalData(e); setOpenModal(true); };
    const handleSubmit = async data => {
        setLoading(true);
        try {
            if (data.id) {
                await EstadoCompraService.update(data.id, data);
                generarMensaje("Estado actualizado", "success");
            } else {
                await EstadoCompraService.create(data);
                generarMensaje("Estado creado", "success");
            }
            setEstados(await EstadoCompraService.getAll());
            setOpenModal(false);
        } catch { generarMensaje("Error en la operación", "error"); }
        finally { setLoading(false); }
    };

    return (
        <main className="p-6">
            <button onClick={handleCreate} className="mb-5 px-4 py-2 bg-blue-600 text-white rounded">Crear estado</button>
            <DynamicTable columns={["ID", "Nombre", "Acciones"]} data={estados.map(e => [
                e.id, e.nombre,
                <button onClick={() => handleEdit(e)} className="px-2 py-1 bg-indigo-500 text-white rounded">Editar</button>
            ])} />
            <CrearEditarEstado isOpen={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSubmit} initialData={modalData} loading={loading} />
        </main>
    );
}
export default ListarEstados;
