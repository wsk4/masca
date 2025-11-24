import React, { useEffect, useState } from "react";
import CreateModal from "../../../components/organisms/CreateModal";
import DireccionService from "../../../service/DireccionService";
import { generarMensaje } from "../../../utils/GenerarMensaje";

function CrearEditarUsuario({ isOpen, onClose, onSubmit, initialData, loading }) {
    const [direcciones, setDirecciones] = useState([]);
    const [loadingDirecciones, setLoadingDirecciones] = useState(false);

    useEffect(() => {
        const fetchDirecciones = async () => {
            setLoadingDirecciones(true);
            try {
                const data = await DireccionService.getAll();
                setDirecciones(data);
            } catch (err) {
                console.error("Error al cargar direcciones:", err);
                generarMensaje("Error al cargar direcciones para el select", "error");
            } finally {
                setLoadingDirecciones(false);
            }
        };
        if (isOpen) {
            fetchDirecciones();
        }
    }, [isOpen]);

    const direccionOptions = [
        { id: "", label: loadingDirecciones ? "Cargando direcciones..." : "Seleccione una dirección" },
        ...direcciones.map(d => ({
            id: d.id,
            label: `${d.calle} ${d.numero} (${d.comuna?.nombre ?? ""})`
        }))
    ];

    const rolOptions = [
        { id: 3, label: "Usuario (3)" },
        { id: 1, label: "Administrador (1)" }
    ];

    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            inputsConfig={[
                { name: "nombre", placeholder: "Nombre", value: initialData?.nombre || "" },
                { name: "correo", placeholder: "Correo", value: initialData?.correo || "" },
                { name: "telefono", placeholder: "Teléfono", value: initialData?.telefono || "" },
                { name: "contra", placeholder: "Contraseña", type: "password", value: "" },
                {
                    name: "rol",
                    type: "select",
                    placeholder: "Rol",
                    options: rolOptions,
                    value: initialData?.rol?.id || ""
                },
                {
                    name: "direccion",
                    type: "select",
                    placeholder: "Dirección",
                    options: direccionOptions,
                    value: initialData?.direccion?.id || ""
                }
            ]}
            title={initialData?.id ? "Editar usuario" : "Crear usuario"}
            submitText="Guardar"
            loading={loading || loadingDirecciones}
            initialData={initialData}
        />
    );
}

export default CrearEditarUsuario;
