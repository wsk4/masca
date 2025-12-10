import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/molecules/DynamicTable";
import { useAuth } from "../../../context/AuthContext";
import CategoriaService from "../../../service/CategoriaService";
import CrearEditarCategoria from "./CrearEditarCategoria";
import { generarMensaje } from "../../../utils/GenerarMensaje";

function ListarCategorias() {
    const { user } = useAuth();
    const [categorias, setCategorias] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        CategoriaService.getAll().then(setCategorias).catch(error => {
            console.error("Error loading categories:", error);
            generarMensaje("Error al cargar categorías", "error");
        });
    }, []);

    const handleCreate = () => { 
        setModalData({}); 
        setOpenModal(true); 
    };
    
    const handleEdit = c => { 
        setModalData(c); 
        setOpenModal(true); 
    };

    const handleSubmit = async data => {
        setLoading(true);
        try {
            if (data.id) {
                await CategoriaService.update(data.id, data);
                generarMensaje("Categoría actualizada", "success");
            } else {
                await CategoriaService.create(data);
                generarMensaje("Categoría creada", "success");
            }
            setCategorias(await CategoriaService.getAll());
            setOpenModal(false);
        } catch (error) { 
            console.error("Operation error:", error);
            generarMensaje("Error en la operación", "error"); 
        }
        finally { 
            setLoading(false); 
        }
    };

    return (
        <main className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Administración de Categorías</h1>
            
            <button 
                onClick={handleCreate} 
                className="mb-5 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
                Crear categoría
            </button>
            
            <div className="bg-white p-4 rounded-lg shadow-xl overflow-x-auto">
                <DynamicTable 
                    columns={["ID", "Nombre", "Acciones"]} 
                    data={categorias.map(c => [
                        c.id, 
                        c.nombre,
                        <button 
                            key={`edit-${c.id}`}
                            onClick={() => handleEdit(c)} 
                            className="px-3 py-1 bg-indigo-500 text-white text-sm rounded-md shadow hover:bg-indigo-600 transition duration-150"
                        >
                            Editar
                        </button>
                    ])} 
                />
            </div>

            <CrearEditarCategoria 
                isOpen={openModal} 
                onClose={() => setOpenModal(false)} 
                onSubmit={handleSubmit} 
                initialData={modalData} 
                loading={loading} 
            />
        </main>
    );
}

export default ListarCategorias;