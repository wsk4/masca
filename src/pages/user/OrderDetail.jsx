import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CompraService from "../../service/CompraService";

function OrderDetail() {
    const { id } = useParams();
    const [compra, setCompra] = useState(null);

    useEffect(() => {
        CompraService.getById(id).then(setCompra);
    }, [id]);

    if (!compra) return <div className="p-8">Cargando...</div>;

    return (
        <main className="max-w-lg mx-auto p-8">
            <h2 className="text-2xl font-bold mb-4">Detalle Compra #{compra.id}</h2>
            <div>Usuario: {compra.usuario?.nombre}</div>
            <div>Total: {compra.total}</div>
            <div>Estado: {compra.estado?.nombre}</div>
            <div>Dirección: {compra.direccion?.nombre}</div>
            
        </main>
    );
}
export default OrderDetail;
