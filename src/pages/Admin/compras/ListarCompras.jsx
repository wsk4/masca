import React, { useEffect, useState } from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import CompraService from "../../service/CompraService";
import DetalleCompra from "./DetalleCompra";
import { useAuth } from "../../context/AuthContext";

function ListarCompras() {
    const { user } = useAuth();
    const [compras, setCompras] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => { CompraService.getAll().then(setCompras); }, []);

    return (
        <main className="p-6">
            <DynamicTable columns={["ID", "Usuario", "Estado compra", "Estado envío", "Fecha", "Acciones"]} data={compras.map(c => [
                c.id, c.usuario?.nombre, c.estadoCompra?.nombre, c.estadoEnvio?.nombre, c.fechaCompra,
                <button onClick={() => setSelectedId(c.id)} className="px-2 py-1 bg-indigo-500 text-white rounded">Ver detalle</button>
            ])} />
            {selectedId && <DetalleCompra id={selectedId} onClose={() => setSelectedId(null)} />}
        </main>
    );
}
export default ListarCompras;
