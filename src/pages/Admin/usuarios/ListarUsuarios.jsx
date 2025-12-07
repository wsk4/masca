import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/molecules/DynamicTable";
import UsuarioService from "../../../service/UsuarioService";
import CrearEditarUsuario from "./CrearEditarUsuario";
import { useAuth } from "../../../context/AuthContext";
import { generarMensaje } from "../../../utils/GenerarMensaje";
import Button from "../../../components/atoms/Button"; // Importamos tu componente

function ListarUsuarios() {
    const { user } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        fetchUsuarios();
    }, [user]);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    
    const handleEdit = (u) => { 
        setModalData({}); 
        setOpenModal(false); 
        setModalData(u);     
        setTimeout(() => setOpenModal(true), 10); 
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

        try {
            await UsuarioService.delete(id);
            generarMensaje("Usuario eliminado", "success");
            // Recargamos la lista después de eliminar
            await fetchUsuarios();
            // Aseguramos que el modal se cierre
            setOpenModal(false); 
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
            
            await fetchUsuarios();
            setOpenModal(false);
        } catch (error) {
            console.error(error);
            generarMensaje("Error en la operación", "error");
        } finally {
            setLoading(false);
        }
    };
    
    if (!user || (user.rol?.id !== 1 && user.rol?.id !== 2)) {
        return <div className="p-8 text-center text-red-500">Acceso denegado: Se requiere rol de administrador.</div>;
    }

    return (
        <main className="p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white border-l-4 border-white pl-4">Gestión de Usuarios</h1>


            <div className="mb-6">
                <Button
                    onClick={handleCreate}
                    text="Crear usuario"
                    className="bg-white text-black hover:bg-gray-200 border-none"
                />
            </div>

            <DynamicTable
                columns={["ID", "Nombre", "Correo", "Rol", "Teléfono", "Dirección", "Acciones"]}
                data={usuarios.map(u => [
                    u.id,
                    u.nombre,
                    u.correo,
                    u.rol?.nombre,
                    u.telefono,
                    u.direccion?.calle ? `${u.direccion.calle} #${u.direccion.numero}` : "Sin dirección",

                    <div key={u.id} className="flex gap-2">
                        <Button
                            text="Editar"
                            onClick={() => handleEdit(u)}
                            className="!py-1 !px-3 bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                        />

                        <Button
                            text="Eliminar"
                            onClick={() => handleDelete(u.id)}
                            className="!py-1 !px-3 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        />
                    </div>
                ])}
            />

            <CrearEditarUsuario
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleSubmit}
                initialData={modalData}
                loading={loading}
                onDelete={handleDelete} 
            />
        </main>
    );
}

export default ListarUsuarios;