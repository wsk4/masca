import React, { useState, useEffect } from "react";
import CreateModal from "../../../components/organisms/CreateModal";
import MarcaService from "../../../service/MarcaService";
import { generarMensaje } from "../../../utils/GenerarMensaje";

// ** IMPORTANTE: Asumiendo que CreateModal ahora acepta una prop `onDelete`
// y un prop `showDeleteButton` o una configuración de botones avanzada.
// Si no es el caso, deberías importar 'Button' y agregar la lógica aquí.

function CrearEditarPerfume({ 
    isOpen, 
    onClose, 
    onSubmit, 
    onDelete, // Nueva prop para manejar la eliminación
    initialData, 
    loading 
}) {
    const [marcas, setMarcas] = useState([]);
    const [loadingMarcas, setLoadingMarcas] = useState(false);

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
            precio: formData.precio ? parseFloat(formData.precio) : 0,
            stock: formData.stock ? parseInt(formData.stock) : 0,
            // Asegúrate de que marca tenga la estructura { id: 1 }
            marca: formData.marca ? { id: parseInt(formData.marca) } : null
        };
        onSubmit(payload);
    };

    // Determinar si se está editando (y por lo tanto, si se puede eliminar)
    const isEditing = !!initialData?.id;

    return (
        <CreateModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            onDelete={onDelete} // Pasar la prop onDelete al modal
            showDeleteButton={isEditing} // Mostrar el botón solo si estamos editando
            title={isEditing ? "Editar Perfume" : "Crear Perfume"}
            submitText={isEditing ? "Actualizar" : "Guardar"}
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