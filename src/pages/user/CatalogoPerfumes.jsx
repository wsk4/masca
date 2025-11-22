import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import MarcaService from "../../service/MarcaService";
import PerfumeService from "../../service/PerfumeService";

function CatalogoPerfumes() {
    const [marcas, setMarcas] = useState([]);
    const [perfumes, setPerfumes] = useState([]);
    const [filtroMarca, setFiltroMarca] = useState("");

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
        <main className="max-w-6xl mx-auto p-8">
            <div className="mb-4">
                <label className="font-semibold">Filtrar por marca:</label>
                <select
                    value={filtroMarca}
                    onChange={e => setFiltroMarca(e.target.value)}
                    className="ml-2 border px-2 py-1 rounded"
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
                columns={["ID", "Nombre", "Marca", "Precio", "Stock", "Imagen"]}
                data={perfumesFiltrados.map(p => [
                    p.id,
                    p.nombre,
                    p.marca?.nombre ?? "",
                    `$${p.precio}`,
                    p.stock,
                    p.url // aquí se mostrará la imagen gracias a DynamicTable
                ])}
            />
        </main>
    );
}

export default CatalogoPerfumes;
