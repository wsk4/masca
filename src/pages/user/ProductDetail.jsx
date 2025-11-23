import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PerfumeService from "../../service/PerfumeService";

function ProductDetail() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);

  useEffect(() => {
    PerfumeService.getById(id).then(setPerfume);
  }, [id]);

  if (!perfume) return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-black text-white">
          Cargando detalle del perfume...
      </div>
  );

  const { nombre, marca, categoria, precio, stock } = perfume;

  return (
    <main className="max-w-lg mx-auto p-8 bg-black text-white min-h-screen">
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-xl">
            
            <h2 className="text-3xl font-extrabold mb-6 text-white border-b border-gray-700 pb-2">
                {nombre}
            </h2>
            
            <div className="space-y-3">
                <p className="text-lg">
                    <strong className="text-gray-400">Marca:</strong> {marca?.nombre}
                </p>
                <p className="text-lg">
                    <strong className="text-gray-400">Categoría:</strong> {categoria?.nombre}
                </p>
                <p className="text-lg">
                    <strong className="text-gray-400">Precio:</strong> <span className="font-semibold">${precio}</span>
                </p>
                <p className="text-lg">
                    <strong className="text-gray-400">Stock:</strong> <span className="font-semibold">{stock} unidades</span>
                </p>
                {/* Puedes agregar más campos según tu modelo */}
            </div>
        </div>
    </main>
  );
}
export default ProductDetail;