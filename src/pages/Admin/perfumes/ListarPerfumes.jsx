import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import PerfumeService from "../../service/PerfumeService";
import CrearEditarPerfume from "./CrearEditarPerfume";
import { useAuth } from "../../context/AuthContext";
import { generarMensaje } from "../../utils/GenerarMensaje";

function ListarPerfumes() {
    const { user } = useAuth();
    const [perfumes, setPerfumes] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => { PerfumeService.getAll().then(setPerfumes); }, []);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    const handleEdit = (perfume) => { setModalData(perfume); setOpenModal(true); };

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
            setPerfumes(await PerfumeService.getAll());
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
                    <button onClick={() => handleEdit(p)} className="px-2 py-1 bg-indigo-500 text-white rounded">Editar</button>
                ])}
            />
            <CrearEditarPerfume
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleSubmit}
                initialData={modalData}
                loading={loading}
            />
        </main>
    );
}
export default ListarPerfumes;
