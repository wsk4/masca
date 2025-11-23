import React from 'react';

/**
 * Componente funcional que muestra los detalles de un artículo de compra.
 * Estética: Modo oscuro (negro y blanco).
 * * @param {{
 * detalle: { 
 * id: number, 
 * producto: { nombre: string }, // Asume que el producto tiene un nombre
 * cantidad: number, 
 * precioUnitario: number 
 * }
 * }} props Los datos del detalle de la compra.
 */
function DetalleCompraCard({ detalle }) {
    if (!detalle) {
        // Se mantiene la estética oscura incluso en caso de datos nulos
        return <div className="p-4 bg-theme-main text-theme-muted">Detalle no disponible.</div>;
    }

    // Desestructuración para acceso limpio a los datos
    const { id, producto, cantidad, precioUnitario } = detalle;
    const subtotal = cantidad * precioUnitario;

    return (
        // Contenedor principal con estética de tarjeta oscura (Gris carbón)
        <div className="bg-theme-card border border-theme-border p-6 rounded-xl shadow-xl">
            
            <h3 className="text-xl font-bold text-white mb-4 border-b border-theme-border pb-2">
                Detalle de Artículo #<span className="text-theme-muted">{id}</span>
            </h3>

            {/* Contenido principal con texto blanco/gris suave */}
            <div className="space-y-3 text-theme-text">
                <p>
                    <strong className="text-theme-muted">Producto:</strong> 
                    <span className="ml-2 font-semibold">{producto?.nombre || 'Desconocido'}</span>
                </p>
                
                <p>
                    <strong className="text-theme-muted">Cantidad:</strong> 
                    <span className="ml-2">{cantidad}</span>
                </p>

                <p>
                    <strong className="text-theme-muted">Precio Unitario:</strong> 
                    {/* Usamos toFixed(2) para el formato numérico */}
                    <span className="ml-2">${precioUnitario?.toFixed(2) || '0.00'}</span>
                </p>
            </div>

            {/* Subtotal - Resaltado con línea divisoria sutil */}
            <div className="mt-6 pt-4 border-t border-theme-border">
                <p className="flex justify-between font-extrabold text-lg">
                    <span>Subtotal del Artículo:</span>
                    <span className="text-theme-accent">${subtotal.toFixed(2)}</span>
                </p>
            </div>
        </div>
    );
}

export default DetalleCompraCard;