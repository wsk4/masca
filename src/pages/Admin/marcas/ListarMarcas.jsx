import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import { useAuth } from "../../context/AuthContext";
import MarcaService from "../../service/MarcaService";
import CrearEditarMarca from "./CrearEditarMarca";
import { generarMensaje } from "../../utils/GenerarMensaje";

function ListarMarcas() {
    const { user } = useAuth();
    const [marcas, setMarcas] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        MarcaService.getAll().then(setMarcas);
    }, []);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    const handleEdit = (marca) => { setModalData(marca); setOpenModal(true); };

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
            setMarcas(await MarcaService.getAll());
            setOpenModal(false);
        } catch { generarMensaje("Error en la operación", "error"); }
        finally { setLoading(false); }
    };

    return (
        <main className="p-6">
            <button onClick={handleCreate} className="mb-5 px-4 py-2 bg-blue-600 text-white rounded">Crear marca</button>
            <DynamicTable columns={["ID", "Nombre", "Acciones"]} data={marcas.map(m => [
                m.id, m.nombre,
                <button onClick={() => handleEdit(m)} className="px-2 py-1 bg-indigo-500 text-white rounded">Editar</button>
            ])} />
            <CrearEditarMarca isOpen={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSubmit} initialData={modalData} loading={loading} />
        </main>
    );
}
export default ListarMarcas;
