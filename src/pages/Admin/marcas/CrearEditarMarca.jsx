import React from "react";
import CreateModal from "../../../components/organisms/CreateModal";

function CrearEditarMarca({ isOpen, onClose, onSubmit, initialData, loading }) {
    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            inputsConfig={[
                { name: "nombre", placeholder: "Nombre", value: initialData?.nombre || "" }
            ]}
            title={initialData?.id ? "Editar marca" : "Crear marca"}
            submitText="Guardar"
            loading={loading}
            initialData={initialData}
        />
    );
}
export default CrearEditarMarca;
