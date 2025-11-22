import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/molecules/DynamicTable";
import UsuarioService from "../../../service/UsuarioService";
import CrearEditarUsuario from "./CrearEditarUsuario";
import { useAuth } from "../../../context/AuthContext";
import { generarMensaje } from "../../../utils/GenerarMensaje";

function ListarUsuarios() {
    const { user } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const data = await UsuarioService.getAll();
                setUsuarios(data);
            } catch (err) {
                console.error("Error al cargar usuarios:", err);
                generarMensaje("Error al cargar usuarios", "error");
            }
        };
        fetchUsuarios();
    }, []);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    const handleEdit = (u) => { setModalData(u); setOpenModal(true); };

    const handleDelete = async (id) => {
        try {
            await UsuarioService.delete(id);
            generarMensaje("Usuario eliminado", "success");
            setUsuarios(await UsuarioService.getAll());
        } catch {
            generarMensaje("Error al eliminar usuario", "error");
        }
    };

    const handleSubmit = async data => {
        setLoading(true);
        try {
            if (data.id) {
                await UsuarioService.update(data.id, data);
                generarMensaje("Usuario actualizado", "success");
            } else {
                await UsuarioService.createUser(data);
                generarMensaje("Usuario creado", "success");
            }
            setUsuarios(await UsuarioService.getAll());
            setOpenModal(false);
        } catch {
            generarMensaje("Error en la operación", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="p-6">
            <button
                onClick={handleCreate}
                className="mb-5 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Crear usuario
            </button>

            <DynamicTable
                columns={["ID", "Nombre", "Correo", "Rol", "Teléfono", "Dirección", "Acciones"]}
                data={usuarios.map(u => [
                    u.id,
                    u.nombre,
                    u.correo,
                    u.rol?.nombre,
                    u.telefono,
                    u.direccion?.calle,
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleEdit(u)}
                            className="px-2 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDelete(u.id)}
                            className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                            Eliminar
                        </button>
                    </div>
                ])}
            />

            <CrearEditarUsuario
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleSubmit}
                initialData={modalData}
                loading={loading}
            />
        </main>
    );
}

export default ListarUsuarios;
