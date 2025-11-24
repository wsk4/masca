import React from "react";
import CreateModal from "../../../components/organisms/CreateModal";

function CrearEditarUbicacion({ isOpen, onClose, onSubmit, initialData, loading }) {
    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            title={initialData?.id ? "Editar ubicación" : "Crear ubicación"}
            submitText={initialData?.id ? "Actualizar" : "Guardar"}
            loading={loading}
            initialData={initialData}
            inputsConfig={[
                { 
                    name: "nombre", 
                    placeholder: "Nombre de la ubicación", 
                    label: "Nombre", // Label para mejor accesibilidad
                    value: initialData?.nombre || "",
                    required: true // Validación visual
                }
            ]}
        />
    );
}

export default CrearEditarUbicacion;