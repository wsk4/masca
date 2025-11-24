import React, { useEffect, useState } from "react";
import CreateModal from "../../../components/organisms/CreateModal";
import DireccionService from "../../../service/DireccionService";
import { generarMensaje } from "../../../utils/GenerarMensaje";

function CrearEditarUsuario({ isOpen, onClose, onSubmit, initialData, loading }) {
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

    // --- FUNCIÓN CLAVE PARA CORREGIR EL ERROR 400 ---
    const handleLocalSubmit = (formData) => {
        // Transformamos los datos planos del formulario al formato JSON que espera Java
        const payload = {
            ...formData,
            // Convertimos "1" -> { id: 1 }
            rol: formData.rol ? { id: parseInt(formData.rol) } : null,
            // Convertimos "5" -> { id: 5 } (o null si está vacío)
            direccion: formData.direccion ? { id: parseInt(formData.direccion) } : null,
            // Manejo de contraseña vacía en edición (opcional)
            contra: formData.contra === "" ? null : formData.contra
        };

        // Si estamos editando y la contraseña es null, es mejor borrarla del payload
        // para evitar que se actualice a nulo si el backend no lo maneja, 
        // aunque tu backend parece manejarlo bien con partialUpdate.
        if (initialData?.id && !payload.contra) {
            delete payload.contra;
        }

        // Enviamos los datos ya procesados
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
            onSubmit={handleLocalSubmit} // Usamos nuestra función intermedia
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