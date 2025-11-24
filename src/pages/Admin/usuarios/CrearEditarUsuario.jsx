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
        { id: "", label: loadingDirecciones ? "Cargando..." : "Sin dirección asignada" },
        ...direcciones.map(d => ({
            id: d.id,
            label: `${d.calle} #${d.numero} (${d.comuna?.nombre || "Sin comuna"})`
        }))
    ];
    
    const rolOptions = [
        { id: 1, label: "Administrador" },
        { id: 2, label: "Cliente" }
    ];

    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            title={initialData?.id ? "Editar Usuario" : "Crear Nuevo Usuario"}
            submitText={initialData?.id ? "Actualizar" : "Guardar Usuario"}
            loading={loading || loadingDirecciones}
            initialData={initialData}
            inputsConfig={[
                { 
                    name: "nombre", 
                    label: "Nombre Completo",
                    placeholder: "Ej: Juan Pérez", 
                    value: initialData?.nombre || "",
                    required: true 
                },
                { 
                    name: "correo", 
                    label: "Correo Electrónico",
                    placeholder: "ejemplo@correo.com", 
                    value: initialData?.correo || "",
                    type: "email",
                    required: true 
                },
                { 
                    name: "contra", 
                    label: "Contraseña",
                    placeholder: initialData?.id ? "Dejar en blanco para mantener la actual" : "Mínimo 6 caracteres", 
                    type: "password", 
                    value: "",
                    required: !initialData?.id 
                }, 
                { 
                    name: "telefono", 
                    label: "Teléfono (Opcional)",
                    placeholder: "+56 9 1234 5678", 
                    value: initialData?.telefono || "" 
                },
                {
                    name: "rol",
                    label: "Rol de Usuario",
                    type: "select",
                    placeholder: "Seleccione un rol...",
                    options: rolOptions,
                    value: initialData?.rol?.id || "",
                    required: true 
                },
                {
                    name: "direccion",
                    label: "Dirección Principal (Opcional)",
                    type: "select",
                    placeholder: "Seleccione una dirección...",
                    options: direccionOptions,
                    value: initialData?.direccion?.id || ""
                }
            ]}
        />
    );
}

export default CrearEditarUsuario;