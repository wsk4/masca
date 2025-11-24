import React, { useEffect, useState } from "react";
import CreateModal from "../../../components/organisms/CreateModal";
import DireccionService from "../../../service/DireccionService";
import { generarMensaje } from "../../../utils/GenerarMensaje";

function CrearEditarUsuario({ isOpen, onClose, onSubmit, initialData, loading }) {
    // Estado para cargar direcciones dinámicamente
    const [direcciones, setDirecciones] = useState([]);
    const [loadingDirecciones, setLoadingDirecciones] = useState(false);

    // Cargar direcciones al abrir el modal
    useEffect(() => {
        if (isOpen) {
            const fetchDirecciones = async () => {
                setLoadingDirecciones(true);
                try {
                    const data = await DireccionService.getAll();
                    setDirecciones(data || []);
                } catch (error) {
                    console.error("Error cargando direcciones:", error);
                    generarMensaje("Error al obtener direcciones", "error");
                } finally {
                    setLoadingDirecciones(false);
                }
            };
            fetchDirecciones();
        }
    }, [isOpen]);

    // Opciones para el Select de Dirección
    const direccionOptions = [
        { id: "", label: loadingDirecciones ? "Cargando..." : "Sin dirección asignada" },
        ...direcciones.map(d => ({
            id: d.id,
            label: `${d.calle} #${d.numero} (${d.comuna?.nombre || 'Sin comuna'})`
        }))
    ];

    // Opciones para el Select de Rol
    const rolOptions = [
        { id: 1, label: "Administrador" },
        { id: 2, label: "Cliente" }
    ];

    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            title={initialData?.id ? "Editar usuario" : "Crear usuario"}
            submitText="Guardar"
            loading={loading || loadingDirecciones}
            initialData={initialData}
            inputsConfig={[
                { 
                    name: "nombre", 
                    placeholder: "Nombre", 
                    value: initialData?.nombre || "",
                    required: true 
                },
                { 
                    name: "correo", 
                    placeholder: "Correo", 
                    value: initialData?.correo || "",
                    type: "email",
                    required: true 
                },
                { 
                    name: "telefono", 
                    placeholder: "Teléfono", 
                    value: initialData?.telefono || "" 
                },
                { 
                    name: "contra", 
                    placeholder: initialData?.id ? "Contraseña (dejar vacío para mantener)" : "Contraseña", 
                    type: "password", 
                    value: "",
                    required: !initialData?.id // Obligatorio solo al crear
                },
                {
                    name: "rol",
                    type: "select",
                    placeholder: "Rol",
                    options: rolOptions,
                    value: initialData?.rol?.id || "",
                    required: true
                },
                {
                    name: "direccion",
                    type: "select",
                    placeholder: "Dirección",
                    options: direccionOptions,
                    value: initialData?.direccion?.id || ""
                }
            ]}
        />
    );
}

export default CrearEditarUsuario;