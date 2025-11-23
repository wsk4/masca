import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PerfumeService from "../../service/PerfumeService";
// Opcional: Importar un componente de imagen si se usara el URL del perfume
// import Image from "../../components/atoms/Image"; 

function ProductDetail() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);

  useEffect(() => {
    // Uso del servicio y manejo del ID como dependencia
    PerfumeService.getById(id).then(setPerfume);
  }, [id]);

  // Manejo de carga/error: Estilo oscuro y centrado.
  if (!perfume) {
      return (
          <div className="flex items-center justify-center min-h-screen p-8 bg-black text-white">
              Cargando detalle del perfume...
          </div>
      );
  }

  // Desestructuración para código más limpio
  const { nombre, marca, categoria } = perfume;
  // Opcional: const imageUrl = perfume.url;

  return (
    // Contenedor principal: Fondo negro, texto blanco
    <main className="max-w-lg mx-auto p-8 bg-black text-white min-h-screen">
        
        {/* Contenedor de la información, aplicando el tema de tarjeta oscura (si está definido) */}
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-xl">
            
            <h2 className="text-3xl font-extrabold mb-6 text-white border-b border-gray-700 pb-2">
                {nombre}
            </h2>
            
            {/* Detalles usando estilos de texto sutiles */}
            <div className="space-y-3">
                <p className="text-lg">
                    <strong className="text-gray-400">Marca:</strong> {marca?.nombre}
                </p>
                <p className="text-lg">
                    <strong className="text-gray-400">Categoría:</strong> {categoria?.nombre}
                </p>
                {/* Puedes agregar más campos aquí */}
            </div>

            {/* Opcional: Mostrar imagen si se quiere aprovechar el campo URL */}
            {/*
            {imageUrl && (
                <div className="mt-6 pt-4 border-t border-gray-700">
                    <Image src={imageUrl} alt={nombre} className="w-full h-auto max-h-64 object-contain bg-white/10 p-2 rounded-lg" />
                </div>
            )}
            */}
        </div>
    </main>
  );
}
export default ProductDetail;