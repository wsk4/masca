import React, { useEffect, useState } from "react";
import CreateModal from "../../../components/organisms/CreateModal";
import DireccionService from "../../../service/DireccionService";
import { generarMensaje } from "../../../utils/GenerarMensaje";

function CrearEditarUsuario({ isOpen, onClose, onSubmit, initialData, loading }) {
    const [direcciones, setDirecciones] = useState([]);
    const [loadingDirecciones, setLoadingDirecciones] = useState(false);

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


    const handleLocalSubmit = (formData) => {

        const payload = {
            ...formData,
            rol: formData.rol ? { id: parseInt(formData.rol) } : null,

            direccion: formData.direccion ? { id: parseInt(formData.direccion) } : null,

            contra: formData.contra === "" ? null : formData.contra
        };

        if (initialData?.id && !payload.contra) {
            delete payload.contra;
        }

        onSubmit(payload);
    };

    const direccionOptions = [
        { id: "", label: loadingDirecciones ? "Cargando..." : "Sin dirección asignada" },
        ...direcciones.map(d => ({
            id: d.id,
            label: `${d.calle} #${d.numero} (${d.comuna?.nombre || 'Sin comuna'})`
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
            onSubmit={handleLocalSubmit} 
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
                    required: !initialData?.id 
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