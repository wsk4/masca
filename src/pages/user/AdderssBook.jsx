import React, { useEffect, useState } from "react";
import DireccionService from "../../service/DireccionService";
import DynamicTable from "../../components/molecules/DynamicTable";
import CreateModal from "../../components/organisms/CreateModal";
import { generarMensaje } from "../../utils/GenerarMensaje";

function AddressBook() {
    const [direcciones, setDirecciones] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        DireccionService.getAll().then(setDirecciones);
    }, []);

    const handleCreate = () => { setModalData({}); setModalOpen(true); };
    const handleEdit = (dir) => { setModalData(dir); setModalOpen(true); };
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
            setDirecciones(await DireccionService.getAll());
            setModalOpen(false);
        } catch { generarMensaje("Error en la operación", "error"); }
        finally { setLoading(false); }
    };

    return (
        <main className="max-w-3xl mx-auto p-8">
            <button onClick={handleCreate} className="mb-5 px-4 py-2 bg-blue-600 text-white rounded">Agregar dirección</button>
            <DynamicTable
                columns={["ID", "Nombre", "Acciones"]}
                data={direcciones.map(d => [
                    d.id, d.nombre,
                    <button onClick={() => handleEdit(d)} className="px-2 py-1 bg-indigo-500 text-white rounded">Editar</button>
                ])}
            />
            <CreateModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleSubmit}
                inputsConfig={[{ name: "nombre", placeholder: "Nombre", value: modalData.nombre }]}
                title={modalData?.id ? "Editar dirección" : "Agregar dirección"}
                submitText="Guardar"
                loading={loading}
                initialData={modalData}
            />
        </main>
    );
}
export default AddressBook;
