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

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    
    const handleEdit = (u) => { 
        setModalData({}); 
        setOpenModal(false); 
        // Pequeño hack para asegurar que el modal se refresque si ya estaba abierto o con datos viejos
        setModalData(u);     
        setTimeout(() => setOpenModal(true), 10); 
    };

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

        try {
            await UsuarioService.delete(id);
            generarMensaje("Usuario eliminado", "success");
            // Recargar lista
            const data = await UsuarioService.getAll();
            setUsuarios(data);
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
            
            // Recargar lista y cerrar modal
            const updatedData = await UsuarioService.getAll();
            setUsuarios(updatedData);
            setOpenModal(false);
        } catch (error) {
            console.error(error);
            generarMensaje("Error en la operación", "error");
        } finally {
            setLoading(false);
        }
    };
    
    // CONTROL DE ACCESO
    if (!user || (user.rol?.id !== 1 && user.rol?.id !== 2)) {
         return <div className="p-8 text-center text-red-500">Acceso denegado: Se requiere rol de administrador.</div>;
    }

    return (
        <main className="p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white border-l-4 border-white pl-4">Gestión de Usuarios</h1>

            {/* Botón Principal de Crear */}
            <Button
                onClick={handleCreate}
                text="Crear usuario"
                className="mb-6 bg-white text-black font-bold appearance-none border-none hover:bg-gray-200"
            />

            <DynamicTable
                columns={["ID", "Nombre", "Correo", "Rol", "Teléfono", "Dirección", "Acciones"]}
                data={usuarios.map(u => [
                    u.id,
                    u.nombre,
                    u.correo,
                    u.rol?.nombre,
                    u.telefono,
                    u.direccion?.calle ? `${u.direccion.calle} #${u.direccion.numero}` : "Sin dirección",
                    // --- COLUMNA DE ACCIONES ---
                    <div key={u.id} className="flex space-x-2">
                        {/* Reemplazo de botón nativo por Button Component para EDITAR */}
                        <Button
                            text="Editar"
                            onClick={() => handleEdit(u)}
                            className="px-3 py-1 text-sm bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors"
                        />
                        
                        {/* Reemplazo de botón nativo por Button Component para ELIMINAR */}
                        <Button
                            text="Eliminar"
                            onClick={() => handleDelete(u.id)}
                            className="px-3 py-1 text-sm bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
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
            />
        </main>
    );
}

export default ListarUsuarios;