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

    const fetchCategorias = async () => {
        try {
            const data = await CategoriaService.getAll();
            setCategorias(data || []);
        } catch (error) {
            console.error("Error al cargar categorías:", error);
            generarMensaje("Error al cargar categorías", "error");
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    const handleEdit = c => { setModalData(c); setOpenModal(true); };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) return;

        setLoading(true);
        try {
            await CategoriaService.delete(id);
            generarMensaje("Categoría eliminada correctamente", "success");
            setOpenModal(false);
            await fetchCategorias();
        } catch (error) {
            console.error("Error al eliminar categoría:", error);
            generarMensaje("Error al eliminar la categoría", "error");
        } finally {
            setLoading(false);
        }
    };

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
            await fetchCategorias();
            setOpenModal(false);
        } catch { generarMensaje("Error en la operación", "error"); }
        finally { setLoading(false); }
    };

    return (
        <main className="p-6">
            <button onClick={handleCreate} className="mb-5 px-4 py-2 bg-blue-600 text-white rounded">Crear categoría</button>
            <DynamicTable 
                columns={["ID", "Nombre", "Acciones"]} 
                data={categorias.map(c => [
                    c.id, c.nombre,
                    <div key={c.id} className="flex gap-2">
                        <button onClick={() => handleEdit(c)} className="px-2 py-1 bg-indigo-500 text-white rounded">Editar</button>
                        <button 
                            onClick={() => handleDelete(c.id)} 
                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Eliminar
                        </button>
                    </div>
                ])} 
            />
            <CrearEditarCategoria 
                isOpen={openModal} 
                onClose={() => setOpenModal(false)} 
                onSubmit={handleSubmit} 
                onDelete={handleDelete}
                initialData={modalData} 
                loading={loading} 
            />
        </main>
    );
}
export default ListarCategorias;