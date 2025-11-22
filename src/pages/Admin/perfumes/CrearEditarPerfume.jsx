import React from "react";
import CreateModal from "../../../components/organisms/CreateModal";

function CrearEditarPerfume({ isOpen, onClose, onSubmit, initialData, loading }) {
    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            inputsConfig={[
                { name: "nombre", placeholder: "Nombre", value: initialData?.nombre || "" },
                { name: "descripcion", placeholder: "Descripción", value: initialData?.descripcion || "" },
                { name: "precio", type: "number", placeholder: "Precio", value: initialData?.precio || "" },
                { name: "stock", type: "number", placeholder: "Stock", value: initialData?.stock || "" },
                { name: "url", placeholder: "URL de imagen", value: initialData?.url || "" },
                { name: "marca", placeholder: "Marca", value: initialData?.marca?.nombre || "" }
                // Si la marca se obtiene por select, aquí agregas un select con opciones.
            ]}
            title={initialData?.id ? "Editar perfume" : "Crear perfume"}
            submitText="Guardar"
            loading={loading}
            initialData={initialData}
        />
    );
}
export default CrearEditarPerfume;
