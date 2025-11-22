import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/molecules/DynamicTable";
import { useAuth } from "../../../context/AuthContext";
import CategoriaService from "../../../service/CategoriaService";
import CrearEditarCategoria from "./CrearEditarCategoria";
import { generarMensaje } from "../../../utils/GenerarMensaje";

function ListarCategorias() {
    const { user } = useAuth();
    const [categorias, setCategorias] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        CategoriaService.getAll().then(setCategorias);
    }, []);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    const handleEdit = c => { setModalData(c); setOpenModal(true); };

    const handleSubmit = async data => {
        setLoading(true);
        try {
            if (data.id) {
                await CategoriaService.update(data.id, data);
                generarMensaje("Categoría actualizada", "success");
            } else {
                await CategoriaService.create(data);
                generarMensaje("Categoría creada", "success");
            }
            setCategorias(await CategoriaService.getAll());
            setOpenModal(false);
        } catch { generarMensaje("Error en la operación", "error"); }
        finally { setLoading(false); }
    };

    return (
        <main className="p-6">
            <button onClick={handleCreate} className="mb-5 px-4 py-2 bg-blue-600 text-white rounded">Crear categoría</button>
            <DynamicTable columns={["ID", "Nombre", "Acciones"]} data={categorias.map(c => [
                c.id, c.nombre,
                <button onClick={() => handleEdit(c)} className="px-2 py-1 bg-indigo-500 text-white rounded">Editar</button>
            ])} />
            <CrearEditarCategoria isOpen={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSubmit} initialData={modalData} loading={loading} />
        </main>
    );
}
export default ListarCategorias;
