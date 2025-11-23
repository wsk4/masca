import React, { useEffect, useState } from "react";
import CompraService from "../../../service/CompraService";

function DetalleCompra({ id, onClose }) {
    const [compra, setCompra] = useState(null);

    useEffect(() => {
        CompraService.getById(id).then(setCompra);
    }, [id]);

    // Estilo para el estado de carga (Modo Oscuro)
    if (!compra) return (
        <div className="flex items-center justify-center min-h-screen p-8 bg-black text-white">
            Cargando detalle...
        </div>
    );

    // Se asume: compra.detalleCompras es un array de DetalleCompra
    const detalles = compra.detalleCompras || [];

    return (
        // Overlay con desenfoque de fondo (Modo Oscuro)
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            {/* Contenedor del Modal: Color de tarjeta oscuro y borde sutil */}
            <div className="bg-gray-900 text-white border border-gray-700 p-7 rounded-lg relative shadow-2xl max-w-xl w-full">
                
                {/* Botón de cerrar con estilo sutil */}
                <button 
                    className="absolute right-4 top-3 text-gray-400 hover:text-white transition-colors text-2xl" 
                    onClick={onClose}
                >
                    &times;
                </button>
                
                <h2 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2">
                    Detalle de Compra #<span className="text-gray-400">{compra.id}</span>
                </h2>
                
                {/* Información de la Compra Principal */}
                <div className="space-y-1 text-sm mb-6">
                    <p>
                        <strong className="text-gray-500 mr-2">Usuario:</strong> 
                        <span className="font-semibold">{compra.usuario?.nombre}</span>
                    </p>
                    <p>
                        <strong className="text-gray-500 mr-2">Estado Compra:</strong> 
                        <span className="font-semibold">{compra.estadoCompra?.nombre}</span>
                    </p>
                    <p>
                        <strong className="text-gray-500 mr-2">Estado Envío:</strong> 
                        <span className="font-semibold">{compra.estadoEnvio?.nombre}</span>
                    </p>
                    <p>
                        <strong className="text-gray-500 mr-2">Fecha:</strong> 
                        <span className="font-semibold">{compra.fechaCompra}</span>
                    </p>
                </div>

                <h3 className="font-bold text-xl mb-3">Productos comprados (Detalles de Compra)</h3>
                
                {/* Tabla de Productos: Estilo Oscuro y Completo */}
                <div className="overflow-x-auto border border-gray-700 rounded-lg">
                    <table className="w-full table-auto text-sm">
                        <thead className="bg-gray-800">
                            <tr>
                                {/* Se agrega la columna ID del DetalleCompra */}
                                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-gray-400">ID</th>
                                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-gray-400">Producto</th>
                                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-gray-400">Cantidad</th>
                                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-gray-400">Precio Unitario</th>
                                <th className="text-left p-3 text-xs font-bold uppercase tracking-wider text-gray-400">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {detalles.map(detalle => (
                                <tr key={detalle.id} className="hover:bg-gray-800 transition-colors">
                                    {/* Muestra el ID del DetalleCompra */}
                                    <td className="p-3 text-gray-400">{detalle.id}</td> 
                                    <td className="p-3">{detalle.producto?.nombre}</td>
                                    <td className="p-3">{detalle.cantidad}</td>
                                    <td className="p-3">${detalle.precioUnitario?.toFixed(2)}</td>
                                    {/* Muestra el Subtotal calculado */}
                                    <td className="p-3 font-semibold">${(detalle.precioUnitario * detalle.cantidad).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Total Final Resaltado */}
                <div className="font-extrabold text-xl text-right mt-4 pt-3 border-t border-gray-700">
                    <span className="text-gray-400 mr-2">Total Compra:</span>
                    <span className="text-white">${detalles.reduce((sum, det) => sum + det.precioUnitario * det.cantidad, 0).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}
export default DetalleCompra;