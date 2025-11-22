import React from "react";
import CreateModal from "../../../components/organisms/CreateModal";

function CrearEditarUbicacion({ isOpen, onClose, onSubmit, initialData, loading }) {
    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            inputsConfig={[
                { name: "nombre", placeholder: "Nombre", value: initialData?.nombre || "" }
            ]}
            title={initialData?.id ? "Editar ubicación" : "Crear ubicación"}
            submitText="Guardar"
            loading={loading}
            initialData={initialData}
        />
    );
}
export default CrearEditarUbicacion;
