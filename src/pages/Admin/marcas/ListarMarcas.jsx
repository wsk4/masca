import React, { useEffect, useState } from "react";
import DynamicTable from "../../../components/molecules/DynamicTable";
import { useAuth } from "../../../context/AuthContext";
import MarcaService from "../../../service/MarcaService";
import CrearEditarMarca from "./CrearEditarMarca";
import { generarMensaje } from "../../../utils/GenerarMensaje";
import Button from "../../../components/atoms/Button"; 

function ListarMarcas() {
    const { user } = useAuth();
    const [marcas, setMarcas] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [loading, setLoading] = useState(false);

    
    const fetchMarcas = async () => {
        try {
            const data = await MarcaService.getAll();
            setMarcas(data || []);
        } catch (error) {
            console.error("Error al cargar marcas:", error);
            generarMensaje("Error al cargar marcas", "error");
        }
    };

    useEffect(() => {
        fetchMarcas();
    }, []);

    const handleCreate = () => { setModalData({}); setOpenModal(true); };
    const handleEdit = (marca) => { setModalData(marca); setOpenModal(true); };


    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta marca? Esta acción es irreversible.")) return;

        setLoading(true);
        try {
            await MarcaService.delete(id); 
            generarMensaje("Marca eliminada correctamente", "success");
            setOpenModal(false); 
            await fetchMarcas();      
        } catch (error) {
            console.error("Error al eliminar marca:", error);
            generarMensaje("Error al eliminar la marca", "error");
        } finally {
            setLoading(false);
        }
    };
   

    const handleSubmit = async data => {
        setLoading(true);
        try {
            if (data.id) {
                await MarcaService.update(data.id, data);
                generarMensaje("Marca actualizada", "success");
            } else {
                await MarcaService.create(data);
                generarMensaje("Marca creada", "success");
            }
            await fetchMarcas(); 
            setOpenModal(false);
        } catch { 
            generarMensaje("Error en la operación", "error"); 
        } finally { 
            setLoading(false); 
        }
    };

    return (
        <main className="p-6">
            <button onClick={handleCreate} className="mb-5 px-4 py-2 bg-blue-600 text-white rounded">Crear marca</button>
            <DynamicTable 
                columns={["ID", "Nombre", "Acciones"]} 
                data={marcas.map(m => [
                    m.id, 
                    m.nombre,
                    <div key={m.id} className="flex gap-2">
                        
                        <button 
                            onClick={() => handleEdit(m)} 
                            className="px-2 py-1 bg-indigo-500 text-white rounded"
                        >
                            Editar
                        </button>
                        
                        <Button 
                            onClick={() => handleDelete(m.id)} 
                            text="Eliminar"
                            className="!py-1 !px-3 bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        />
                    </div>
                ])} 
            />
            
            <CrearEditarMarca 
                isOpen={openModal} 
                onClose={() => setOpenModal(false)} 
                onSubmit={handleSubmit} 
                onDelete={handleDelete} 
                initialData={modalData} 
                loading={loading} 
            />
        </main>
    );
}
export default ListarMarcas;