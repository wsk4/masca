import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/molecules/DynamicTable";
import PerfumeService from "../../../service/PerfumeService";
import CrearEditarPerfume from "./CrearEditarPerfume";
import { useAuth } from "../../../context/AuthContext";
import { generarMensaje } from "../../../utils/GenerarMensaje";

function ListarPerfumes() {
    const { user } = useAuth();
    const [perfumes, setPerfumes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchPerfumes = async () => {
        try {
            const data = await PerfumeService.getAll();
            setPerfumes(data || []);
        } catch (error) {
            console.error("Error al cargar perfumes:", error);
            generarMensaje("Error al cargar perfumes", "error");
        }
    };

    useEffect(() => {
        fetchPerfumes();
    }, []);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    const handleEdit = (perfume) => { setModalData(perfume); setOpenModal(true); };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este perfume?")) return;

        setLoading(true);
        try {
            await PerfumeService.delete(id);
            generarMensaje("Perfume eliminado correctamente", "success");
            setOpenModal(false);
            await fetchPerfumes();
        } catch (error) {
            console.error("Error al eliminar perfume:", error);
            generarMensaje("Error al eliminar el perfume", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (data) => {
        setLoading(true);
        try {
            if (data.id) {
                await PerfumeService.update(data.id, data);
                generarMensaje("Perfume actualizado", "success");
            } else {
                await PerfumeService.create(data);
                generarMensaje("Perfume creado", "success");
            }
            await fetchPerfumes();
            setOpenModal(false);
        } catch {
            generarMensaje("Error en la operación", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!user || user.rol.id > 2) {
        return <div className="text-center mt-8 text-red-700">No tienes permisos.</div>;
    }

    return (
        <main className="p-6">
            <button onClick={handleCreate} className="mb-5 px-4 py-2 bg-blue-600 text-white rounded">Crear perfume</button>
            <DynamicTable
                columns={["ID", "Nombre", "Descripción", "Precio", "Stock", "URL", "Marca", "Acciones"]}
                data={perfumes.map(p => [
                    p.id, p.nombre, p.descripcion, p.precio, p.stock, p.url, p.marca?.nombre,
                    <div key={p.id} className="flex gap-2">
                        <button
                            onClick={() => handleEdit(p)}
                            className="px-2 py-1 bg-indigo-500 text-white rounded"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDelete(p.id)}
                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Eliminar
                        </button>
                    </div>
                ])}
            />
            <CrearEditarPerfume
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
export default ListarPerfumes;