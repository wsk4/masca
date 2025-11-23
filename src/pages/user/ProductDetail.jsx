import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PerfumeService from "../../service/PerfumeService";
import Button from "../../components/atoms/Button"; // Aseguramos que Button está disponible

function ProductDetail() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);

  useEffect(() => {
    // Asegúrate de que PerfumeService use la URL real: https://masca-back.onrender.com
    PerfumeService.getById(id).then(setPerfume);
  }, [id]);

  // Contenedor de carga con estilos temáticos
  if (!perfume) return (
    <main className="min-h-screen p-8 flex items-start justify-center bg-theme-main">
        <div className="p-8 text-theme-muted bg-theme-card rounded-xl border border-theme-border">Cargando detalle...</div>
    </main>
  );

  return (
    // Contenedor principal con fondo negro
    <main className="min-h-screen p-8 flex items-start justify-center bg-theme-main">
      
      {/* Tarjeta de Detalle del Producto (bg-theme-card) */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-theme-card border border-theme-border rounded-xl shadow-2xl p-6 md:p-8">
        
        {/* Columna Izquierda: Imagen */}
        <div className="flex items-center justify-center p-8 bg-theme-main rounded-lg border border-theme-border">
            {/* Usamos el URL que viene del backend o un placeholder */}
            <img src={perfume.url || "/img/perfume.webp"} alt={perfume.nombre} className="max-h-96 object-contain drop-shadow-lg" />
        </div>
        
        {/* Columna Derecha: Información */}
        <div className="space-y-6">
            
            <h1 className="text-4xl font-black text-white">{perfume.nombre}</h1>
            
            {/* Precio destacado */}
            <p className="text-3xl font-bold text-white border-b border-theme-border pb-4">
                {/* Formato de moneda, si tu backend lo envía sin formato */}
                ${(perfume.precio || 0).toLocaleString('es-CL') || 'Precio no disponible'}
            </p>

            {/* Detalles del producto */}
            <div className="space-y-3 text-base">
                <div className="text-white"><strong className="text-theme-muted">Marca:</strong> {perfume.marca?.nombre || 'N/A'}</div>
                <div className="text-white"><strong className="text-theme-muted">Categoría:</strong> {perfume.categoria?.nombre || 'N/A'}</div>
                {/* Lógica de Stock */}
                <div className="text-white">
                    <strong className="text-theme-muted">Stock:</strong> 
                    {(perfume.stock > 0 || 1) // Usamos 1 si no hay dato para mostrar "Disponible"
                        ? <span className="text-green-400 font-bold ml-1">Disponible</span> 
                        : <span className="text-red-400 font-bold ml-1">Agotado</span>
                    }
                </div>
            </div>

            {/* Descripción */}
            <p className="text-theme-muted pt-4 border-t border-theme-border text-sm">
                {perfume.descripcion || "Descripción detallada de la fragancia, notas de salida, corazón y fondo. Una mezcla perfecta de elegancia y durabilidad."}
            </p>

            {/* Botón de acción (Botón Blanco/Negro) */}
            <Button
                text="Agregar al Carrito"
                // Usando bg-white y appearance-none para evitar conflictos de estilo
                className="w-full py-3 mt-8 bg-white text-black font-bold appearance-none border-none"
                disabled={perfume.stock === 0}
            />
        </div>
      </div>
    </main>
  );
}
export default ProductDetail;