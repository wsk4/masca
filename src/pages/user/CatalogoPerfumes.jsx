import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import DynamicTable from "../../components/molecules/DynamicTable";
import MarcaService from "../../service/MarcaService";
import PerfumeService from "../../service/PerfumeService";

function CatalogoPerfumes() {
    const [marcas, setMarcas] = useState([]);
    const [perfumes, setPerfumes] = useState([]);
    const [filtroMarca, setFiltroMarca] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const marcasData = await MarcaService.getAll();
                setMarcas(marcasData);
                const perfumesData = await PerfumeService.getAll();
                setPerfumes(perfumesData);
            } catch (err) {
                console.error("Error al cargar catálogo:", err);
            }
        };
        fetchData();
    }, []);

    const perfumesFiltrados = filtroMarca
        ? perfumes.filter(p => p.marca && String(p.marca.id) === String(filtroMarca))
        : perfumes;

    return (
        <main className="max-w-6xl mx-auto p-8 bg-black text-white min-h-screen">
            <div className="mb-4">
                <label className="font-semibold text-white">Filtrar por marca:</label>
                <select
                    value={filtroMarca}
                    onChange={e => setFiltroMarca(e.target.value)}
                    className="ml-2 border border-gray-700 bg-gray-800 text-white px-2 py-1 rounded"
                >
                    <option value="">Todas</option>
                    {marcas.map(m => (
                        <option key={m.id} value={m.id}>
                            {m.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <DynamicTable
                columns={["ID", "Nombre", "Marca", "Precio", "Stock", "Detalle"]}
                data={perfumesFiltrados.map(p => [
                    p.id,
                    p.nombre,
                    p.marca?.nombre ?? "",
                    `$${p.precio}`,
                    p.stock,
                    <button 
                        key={`btn-${p.id}`}
                        onClick={() => navigate(`/producto/${p.id}`)}
                        className="px-3 py-1 bg-white text-black rounded hover:bg-gray-200 transition-colors duration-200 font-medium"
                    >
                        Ver Detalle
                    </button>
                ])}
                className="bg-gray-900 text-white rounded shadow-lg"
            />
        </main>
    );
}

export default CatalogoPerfumes;