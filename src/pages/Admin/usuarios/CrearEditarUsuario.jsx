import React, { useEffect, useState } from "react";
import CreateModal from "../../../components/organisms/CreateModal";
import DireccionService from "../../../service/DireccionService";

function CrearEditarUsuario({ isOpen, onClose, onSubmit, initialData, loading }) {
    const [direcciones, setDirecciones] = useState([]);

    useEffect(() => {
        const fetchDirecciones = async () => {
            try {
                const data = await DireccionService.getAll();
                setDirecciones(data);
            } catch (err) {
                console.error("Error al cargar direcciones:", err);
            }
        };
        fetchDirecciones();
    }, []);

    const direccionOptions = [
        { value: "", label: "Seleccione una dirección" },
        ...direcciones.map(d => ({
            value: d.id,
            label: `${d.calle} ${d.numero} (${d.comuna?.nombre ?? ""})`
        }))
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
                    name: "direccion",
                    type: "select",
                    placeholder: "Dirección",
                    options: direccionOptions,
                    value: initialData?.direccion?.id || ""
                }
            ]}
            title={initialData?.id ? "Editar usuario" : "Crear usuario"}
            submitText="Guardar"
            loading={loading}
            initialData={initialData}
        />
    );
}

export default CrearEditarUsuario;