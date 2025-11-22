import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import MarcaService from "../../service/MarcaService";
import PerfumeService from "../../service/PerfumeService";

function CatalogoPerfumes() {
    const [marcas, setMarcas] = useState([]);
    const [perfumes, setPerfumes] = useState([]);
    const [filtroMarca, setFiltroMarca] = useState("");

    useEffect(() => {
        MarcaService.getAll().then(setMarcas);
        PerfumeService.getAll().then(setPerfumes);
    }, []);

    const perfumesFiltrados = filtroMarca
        ? perfumes.filter(p => p.marca && p.marca.id === filtroMarca)
        : perfumes;

    return (
        <main className="max-w-3xl mx-auto p-8">
            <div className="mb-4">
                <label>Filtrar por marca:</label>
                <select value={filtroMarca} onChange={e => setFiltroMarca(e.target.value)} className="ml-2 border px-2 py-1 rounded">
                    <option value="">Todas</option>
                    {marcas.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </select>
            </div>
            <DynamicTable
                columns={["ID", "Nombre", "Marca"]}
                data={perfumesFiltrados.map(p => [
                    p.id, p.nombre, p.marca?.nombre ?? ""
                ])}
            />
        </main>
    );
}
export default CatalogoPerfumes;
