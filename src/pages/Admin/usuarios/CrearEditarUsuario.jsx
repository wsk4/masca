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
                // Asegurar que el servicio use la URL de Render correcta
                const data = await DireccionService.getAll(); 
                setDirecciones(data);
            } catch (err) {
                console.error("Error al cargar direcciones:", err);
                generarMensaje("Error al cargar direcciones para el select", "error");
            } finally {
                setLoadingDirecciones(false);
            }
        };
        // Cargar direcciones solo cuando el modal se abre
        if (isOpen) {
            fetchDirecciones();
        }
    }, [isOpen]);

    // Opciones dinámicas para el select de Dirección
    const direccionOptions = [
        { id: "", label: loadingDirecciones ? "Cargando direcciones..." : "Seleccione una dirección" },
        // Mapear al formato { id: X, label: Y }
        ...direcciones.map(d => ({
            id: d.id,
            label: `${d.calle} ${d.numero} (${d.comuna?.nombre ?? ""})`
        }))
    ];
    
    // Opciones para el Rol (IDs 1 y 3, según el flujo típico)
    const rolOptions = [
        { id: 3, label: "Usuario" }, 
        { id: 1, label: "Administrador" }
    ];

    // NOTA: Los campos de select envían solo el 'value' (ID), que se mapea a un objeto { id: X } en el submit.

    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            inputsConfig={[
                { name: "nombre", placeholder: "Nombre", value: initialData?.nombre || "" },
                { name: "correo", placeholder: "Correo", value: initialData?.correo || "" },
                { name: "telefono", placeholder: "Teléfono", value: initialData?.telefono || "" },
                // Campo de contraseña usando 'contra' (según el modelo de backend)
                { name: "contra", placeholder: "Contraseña (dejar vacío para no cambiar)", type: "password", value: "" }, 
                {
                    name: "rol",
                    type: "select",
                    placeholder: "Rol",
                    options: rolOptions,
                    // Valor inicial: usa el ID del rol anidado
                    value: initialData?.rol?.id || "" 
                },
                {
                    name: "direccion",
                    type: "select",
                    placeholder: "Dirección",
                    options: direccionOptions,
                    // Valor inicial: usa el ID de la dirección anidada
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