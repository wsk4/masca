import React, { useEffect, useState } from "react";
import CreateModal from "../../../components/organisms/CreateModal";
import DireccionService from "../../../service/DireccionService";
import { generarMensaje } from "../../../utils/GenerarMensaje"; // Importar mensaje

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
        // Solo cargar direcciones si el modal está abierto o si es necesario
        if (isOpen) {
            fetchDirecciones();
        }
    }, [isOpen]);

    // Opciones dinámicas para el select de Dirección
    const direccionOptions = [
        { id: "", label: loadingDirecciones ? "Cargando direcciones..." : "Seleccione una dirección" },
        ...direcciones.map(d => ({
            id: d.id,
            label: `${d.calle} ${d.numero} (${d.comuna?.nombre ?? ""})`
        }))
    ];
    
    // Opciones para el Rol (hardcodeado, asumiendo IDs 1 y 3)
    const rolOptions = [
        { id: 3, label: "Usuario (3)" }, 
        { id: 1, label: "Administrador (1)" }
    ];

    // NOTA CLAVE: El campo de contraseña usa 'contra'
    // Los campos de relación (rol, direccion) envían solo el ID.

    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            inputsConfig={[
                { name: "nombre", placeholder: "Nombre", value: initialData?.nombre || "" },
                { name: "correo", placeholder: "Correo", value: initialData?.correo || "" },
                { name: "telefono", placeholder: "Teléfono", value: initialData?.telefono || "" },
                // Campo de contraseña usando 'contra'
                { name: "contra", placeholder: "Contraseña", type: "password", value: "" }, 
                {
                    name: "rol",
                    type: "select",
                    placeholder: "Rol",
                    options: rolOptions,
                    // Se espera un objeto rol anidado en initialData
                    value: initialData?.rol?.id || "" 
                },
                {
                    name: "direccion",
                    type: "select",
                    placeholder: "Dirección",
                    options: direccionOptions,
                    // Se espera un objeto direccion anidado en initialData
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