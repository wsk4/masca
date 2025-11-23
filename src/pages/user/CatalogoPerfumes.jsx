import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import MarcaService from "../../service/MarcaService";
import PerfumeService from "../../service/PerfumeService";
import { useNavigate } from "react-router-dom"; // 1. Importar useNavigate
import Button from "../../components/atoms/Button"; // 2. Importar Button

function CatalogoPerfumes() {
    const [marcas, setMarcas] = useState([]);
    const [perfumes, setPerfumes] = useState([]);
    const [filtroMarca, setFiltroMarca] = useState("");
    const navigate = useNavigate(); // 3. Inicializar useNavigate

    useEffect(() => {
        // Asegúrate de que los servicios usen la URL correcta: https://masca-back.onrender.com
        MarcaService.getAll().then(setMarcas);
        PerfumeService.getAll().then(setPerfumes);
    }, []);

    const perfumesFiltrados = filtroMarca
        ? perfumes.filter(p => p.marca && p.marca.id === filtroMarca)
        : perfumes;

    return (
        <main className="max-w-6xl mx-auto p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white border-l-4 border-white pl-4">Catálogo de Perfumes</h1>

            <div className="mb-8 p-4 bg-theme-card rounded-lg border border-theme-border">
                <label htmlFor="marca-filter" className="text-theme-muted font-medium mr-3">Filtrar por marca:</label>
                <select 
                    id="marca-filter"
                    value={filtroMarca} 
                    onChange={e => setFiltroMarca(e.target.value)} 
                    className="border px-4 py-2 rounded-lg bg-theme-main text-white border-theme-border focus:ring-1 focus:ring-white"
                >
                    <option value="">Todas</option>
                    {marcas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </select>
            </div>
            <DynamicTable
                columns={["ID", "Nombre", "Marca", "Acciones"]} // 4. AÑADIR columna "Acciones"
                data={perfumesFiltrados.map(p => [
                    p.id, 
                    p.nombre, 
                    p.marca?.nombre ?? "",
                    // 5. AÑADIR el botón de navegación
                    <Button 
                        key={p.id}
                        text="Ver detalle" 
                        onClick={() => navigate(`/producto/${p.id}`)} // Navega a la ruta /producto/:id
                        className="bg-white text-black px-3 py-1 text-xs font-medium appearance-none border-none"
                    />
                ])}
            />
        </main>
    );
}
export default CatalogoPerfumes;