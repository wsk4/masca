import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/molecules/DynamicTable";
import UsuarioService from "../../../service/UsuarioService";
import CrearEditarUsuario from "./CrearEditarUsuario";
import { useAuth } from "../../../context/AuthContext";
import { generarMensaje } from "../../../utils/GenerarMensaje";
import Button from "../../../components/atoms/Button";

function ListarUsuarios() {
    const { user } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                if (!user || (user.rol?.id !== 1 && user.rol?.id !== 2)) return;
                const data = await UsuarioService.getAll();
                setUsuarios(data);
            } catch (err) {
                console.error("Error al cargar usuarios:", err);
                generarMensaje("Error al cargar usuarios", "error");
            }
        };
        fetchUsuarios();
    }, [user]);

    const handleCreate = () => {
        setModalData({});
        setOpenModal(true);
    };

    const handleEdit = (u) => {
        setModalData(u);      // Establece datos del usuario
        setOpenModal(true);   // Abre modal
    };

    const handleDelete = async (id) => {
        try {
            await UsuarioService.delete(id);
            generarMensaje("Usuario eliminado", "success");
            const data = await UsuarioService.getAll();
            setUsuarios(data);
        } catch (err) {
            console.error("Error al eliminar usuario:", err);
            generarMensaje("Error al eliminar usuario", "error");
        }
    };

    const handleSubmit = async (data) => {
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
        } catch (err) {
            console.error("Error en la operación:", err);
            generarMensaje("Error en la operación", "error");
        } finally {
            setLoading(false);
        }
    };

    if (!user || (user.rol?.id !== 1 && user.rol?.id !== 2)) {
        return (
            <div className="p-8 text-center text-red-500">
                Acceso denegado: Se requiere rol de administrador.
            </div>
        );
    }

    return (
        <main className="p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white border-l-4 border-white pl-4">
                Gestión de Usuarios
            </h1>

            <Button
                onClick={handleCreate}
                text="Crear usuario"
                className="mb-6 bg-white text-black font-bold appearance-none border-none"
            />

            <DynamicTable
                columns={["ID", "Nombre", "Correo", "Rol", "Teléfono", "Dirección", "Acciones"]}
                data={usuarios.map(u => [
                    u.id,
                    u.nombre,
                    u.correo,
                    u.rol?.nombre,
                    u.telefono,
                    u.direccion?.calle,
                    <div key={u.id} className="flex space-x-2">
                        <button
                            onClick={() => handleEdit(u)}
                            className="px-2 py-1 text-blue-400 rounded hover:text-blue-300 bg-transparent border border-blue-400 transition-colors"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleDelete(u.id)}
                            className="px-2 py-1 text-red-400 rounded hover:text-red-300 bg-transparent border border-red-400 transition-colors"
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
