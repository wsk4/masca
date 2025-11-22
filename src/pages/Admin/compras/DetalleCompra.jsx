import React, { useEffect, useState } from "react";
import CompraService from "../../../service/CompraService";

function DetalleCompra({ id, onClose }) {
    const [compra, setCompra] = useState(null);

    useEffect(() => {
        CompraService.getById(id).then(setCompra);
    }, [id]);

    if (!compra) return <div className="p-8">Cargando detalle...</div>;

    // Se asume: compra.detalleCompras es un array de DetalleCompra
    const detalles = compra.detalleCompras || [];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="bg-white p-7 rounded-lg relative shadow-2xl max-w-lg w-full">
                <button className="absolute right-4 top-3" onClick={onClose}>×</button>
                <h2 className="text-2xl font-bold mb-4">Compra #{compra.id}</h2>
                <div>Usuario: {compra.usuario?.nombre}</div>
                <div>Estado compra: {compra.estadoCompra?.nombre}</div>
                <div>Estado envío: {compra.estadoEnvio?.nombre}</div>
                <div>Fecha: {compra.fechaCompra}</div>
                <hr className="my-4" />
                <h3 className="font-semibold mb-2">Productos comprados</h3>
                <table className="w-full table-auto mb-2">
                    <thead>
                        <tr>
                            <th className="text-left p-1">Producto</th>
                            <th className="text-left p-1">Cantidad</th>
                            <th className="text-left p-1">Precio unitario</th>
                            <th className="text-left p-1">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalles.map(detalle => (
                            <tr key={detalle.id}>
                                <td className="p-1">{detalle.producto?.nombre}</td>
                                <td className="p-1">{detalle.cantidad}</td>
                                <td className="p-1">${detalle.precioUnitario?.toFixed(2)}</td>
                                <td className="p-1">${(detalle.precioUnitario * detalle.cantidad).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="font-bold text-right mt-2">
                    Total: ${detalles.reduce((sum, det) => sum + det.precioUnitario * det.cantidad, 0).toFixed(2)}
                </div>
            </div>
        </div>
    );
}
export default DetalleCompra;
