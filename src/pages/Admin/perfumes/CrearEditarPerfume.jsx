import React, { useState, useEffect } from "react";
import CreateModal from "../../../components/organisms/CreateModal";
import MarcaService from "../../../service/MarcaService"; 

function CrearEditarPerfume({ isOpen, onClose, onSubmit, initialData, loading }) {
    const [marcas, setMarcas] = useState([]);

    // Cargar marcas al abrir el componente
    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const data = await MarcaService.getAll();
                setMarcas(data);
            } catch (err) {
                console.error("Error al cargar marcas:", err);
            }
        };
        fetchMarcas();
    }, []);

    const marcaOptions = [
        { value: "", label: "Seleccione una marca" },
        ...marcas.map(m => ({
            value: m.id, 
            label: m.nombre
        }))
    ];

    const handleSubmit = (formData) => {
       
        const payload = {
            ...formData,
            marca: formData.marca ? { id: parseInt(formData.marca) } : null
        };
        onSubmit(payload);
    };

    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit} 
            inputsConfig={[
                { name: "nombre", placeholder: "Nombre", value: initialData?.nombre || "" },
                { name: "descripcion", placeholder: "Descripción", value: initialData?.descripcion || "" },
                { name: "precio", type: "number", placeholder: "Precio", value: initialData?.precio || "" },
                { name: "stock", type: "number", placeholder: "Stock", value: initialData?.stock || "" },
                { name: "url", placeholder: "URL de imagen", value: initialData?.url || "" },
                { 
                    name: "marca", 
                    type: "select", 
                    placeholder: "Marca", 
                    options: marcaOptions,
                    value: initialData?.marca?.id || "" 
                }
            ]}
            title={initialData?.id ? "Editar perfume" : "Crear perfume"}
            submitText="Guardar"
            loading={loading}
            initialData={initialData}
        />
    );
}
export default CrearEditarPerfume;