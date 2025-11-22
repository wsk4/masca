import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import UsuarioService from "../../service/UsuarioService";
import CreateModal from "../../components/organisms/CreateModal";
import { generarMensaje } from "../../utils/GenerarMensaje";

function Profile() {
    const { user } = useAuth();
    const [datos, setDatos] = useState({});
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (user) {
            UsuarioService.getById(user.id)
                .then(res => setDatos(res.data))
                .catch(err => console.error("Error al obtener usuario:", err));
        }
    }, [user]);

    const handleSubmit = async (data) => {
        try {
            const res = await UsuarioService.update(user.id, data);
            generarMensaje("Perfil actualizado", "success");
            setOpenModal(false);
            setDatos(res.data); // refresca con lo que devuelve el backend
        } catch {
            generarMensaje("Error al actualizar", "error");
        }
    };

    if (!user) {
        return (
            <div className="text-center mt-8 text-red-700">
                Acceso restringido.
            </div>
        );
    }

    return (
        <main className="max-w-lg mx-auto p-8">
            <div className="mb-4">
                <div><strong>ID:</strong> {datos.id}</div>
                <div><strong>Nombre:</strong> {datos.nombre}</div>
                <div><strong>Correo:</strong> {datos.correo}</div>
                <button
                    className="mt-3 px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    onClick={() => setOpenModal(true)}
                >
                    Editar datos
                </button>
            </div>
            <CreateModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleSubmit}
                inputsConfig={[
                    { name: "nombre", placeholder: "Nombre", value: datos.nombre },
                    { name: "correo", placeholder: "Correo", value: datos.correo }
                ]}
                title="Editar perfil"
                submitText="Guardar"
                initialData={datos}
            />
        </main>
    );
}

export default Profile;
