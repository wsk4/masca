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

    const fetchCategorias = async () => {
        try {
            setCategorias(await CategoriaService.getAll());
        } catch (error) {
            console.error("Error al cargar categorías:", error);
            generarMensaje("Error al cargar categorías", "error");
        }
    }

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
            fetchCategorias();
            setOpenModal(false);
        } catch { generarMensaje("Error en la operación", "error"); }
        finally { setLoading(false); }
    };

    // 👉 Nueva función para eliminar una categoría
    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) return;
        setLoading(true);
        try {
            await CategoriaService.delete(id);
            generarMensaje("Categoría eliminada", "success");
            fetchCategorias();
            setOpenModal(false);
        } catch (error) {
            console.error("Error al eliminar categoría:", error);
            generarMensaje("Error al eliminar categoría", "error");
        } finally {
            setLoading(false);
        }
    };


    return (
        <main className="p-6">
            <button onClick={handleCreate} className="mb-5 px-4 py-2 bg-blue-600 text-white rounded">Crear categoría</button>
            <DynamicTable columns={["ID", "Nombre", "Acciones"]} data={categorias.map(c => [
                c.id, c.nombre,
                <button onClick={() => handleEdit(c)} className="px-2 py-1 bg-indigo-500 text-white rounded">Editar</button>
            ])} />
            <CrearEditarCategoria 
                isOpen={openModal} 
                onClose={() => setOpenModal(false)} 
                onSubmit={handleSubmit} 
                onDelete={handleDelete} // 👈 Pasamos el handler de eliminación
                initialData={modalData} 
                loading={loading} 
            />
        </main>
    );
}
export default ListarCategorias;