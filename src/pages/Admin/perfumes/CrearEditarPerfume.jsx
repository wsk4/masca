import React, { useState, useEffect } from "react";
import CreateModal from "../../../components/organisms/CreateModal";
import MarcaService from "../../../service/MarcaService";
import { generarMensaje } from "../../../utils/GenerarMensaje";

function CrearEditarPerfume({ isOpen, onClose, onSubmit, initialData, loading }) {
    const [marcas, setMarcas] = useState([]);
    const [loadingMarcas, setLoadingMarcas] = useState(false);

    // Cargar marcas al abrir el componente
    useEffect(() => {
        if (isOpen) {
            const fetchMarcas = async () => {
                setLoadingMarcas(true);
                try {
                    const data = await MarcaService.getAll();
                    setMarcas(data || []);
                } catch (err) {
                    console.error("Error al cargar marcas:", err);
                    generarMensaje("Error al cargar las marcas", "error");
                } finally {
                    setLoadingMarcas(false);
                }
            };
            fetchMarcas();
        }
    }, [isOpen]);

    const marcaOptions = [
        { id: "", label: loadingMarcas ? "Cargando..." : "Seleccione una marca" },
        ...marcas.map(m => ({
            id: m.id,
            label: m.nombre
        }))
    ];

    const handleSubmit = (formData) => {
        const payload = {
            ...formData,
            // Conversión de tipos para el Backend (Java espera números, no strings)
            precio: formData.precio ? parseFloat(formData.precio) : 0,
            stock: formData.stock ? parseInt(formData.stock) : 0,
            // Conversión de ID plano a Objeto Marca
            marca: formData.marca ? { id: parseInt(formData.marca) } : null
        };
        onSubmit(payload);
    };

    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={initialData?.id ? "Editar Perfume" : "Crear Perfume"}
            submitText={initialData?.id ? "Actualizar" : "Guardar"}
            loading={loading || loadingMarcas}
            initialData={initialData}
            inputsConfig={[
                { 
                    name: "nombre", 
                    placeholder: "Nombre", 
                    value: initialData?.nombre || "",
                    required: true 
                },
                { 
                    name: "descripcion", 
                    placeholder: "Descripción", 
                    value: initialData?.descripcion || "" 
                },
                { 
                    name: "precio", 
                    type: "number", 
                    placeholder: "Precio", 
                    value: initialData?.precio || "",
                    required: true 
                },
                { 
                    name: "stock", 
                    type: "number", 
                    placeholder: "Stock", 
                    value: initialData?.stock || "",
                    required: true 
                },
                { 
                    name: "url", 
                    placeholder: "URL de imagen", 
                    value: initialData?.url || "" 
                },
                { 
                    name: "marca", 
                    type: "select", 
                    placeholder: "Marca", 
                    options: marcaOptions,
                    value: initialData?.marca?.id || "",
                    required: true 
                }
            ]}
        />
    );
}

export default CrearEditarPerfume;