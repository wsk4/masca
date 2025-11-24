import React, { useState, useEffect } from "react";
import CreateModal from "../../../components/organisms/CreateModal";
import ComunaService from "../../../service/ComunaService";
import { generarMensaje } from "../../../utils/GenerarMensaje";

function CrearEditarUbicacion({ isOpen, onClose, onSubmit, initialData, loading }) {
    const [comunas, setComunas] = useState([]);
    const [loadingComunas, setLoadingComunas] = useState(false);


    useEffect(() => {
        if (isOpen) {
            const fetchComunas = async () => {
                setLoadingComunas(true);
                try {
                    const data = await ComunaService.getAll();
                    setComunas(data || []);
                } catch (error) {
                    console.error("Error cargando comunas:", error);
                    generarMensaje("Error al cargar comunas", "error");
                } finally {
                    setLoadingComunas(false);
                }
            };
            fetchComunas();
        }
    }, [isOpen]);

    const comunaOptions = [
        { id: "", label: loadingComunas ? "Cargando..." : "Seleccione una comuna" },
        ...comunas.map(c => ({
            id: c.id,
            label: c.nombre
        }))
    ];

    const handleLocalSubmit = (formData) => {
        const payload = {
            ...formData,

            comuna: formData.comuna ? { id: parseInt(formData.comuna) } : null
        };
        onSubmit(payload);
    };

    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleLocalSubmit}
            title={initialData?.id ? "Editar Dirección" : "Crear Dirección"}
            submitText={initialData?.id ? "Actualizar" : "Guardar"}
            loading={loading || loadingComunas}
            initialData={initialData}
            inputsConfig={[
                { 
                    name: "calle", 
                    label: "Calle",
                    placeholder: "Ej: Av. Principal", 
                    value: initialData?.calle || "",
                    required: true 
                },
                { 
                    name: "numero", 
                    label: "Número",
                    placeholder: "Ej: 123", 
                    value: initialData?.numero || ""
                },
                {
                    name: "comuna",
                    label: "Comuna",
                    type: "select",
                    placeholder: "Seleccione comuna...",
                    options: comunaOptions,
                    value: initialData?.comuna?.id || "",
                    required: true
                }
            ]}
        />
    );
}

export default CrearEditarUbicacion;