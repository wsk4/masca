import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PerfumeService from "../../service/PerfumeService";

function ProductDetail() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);

  useEffect(() => {
    PerfumeService.getById(id).then(setPerfume);
  }, [id]);

  if (!perfume) return <div className="p-8">Cargando...</div>;

  return (
    <main className="max-w-lg mx-auto p-8">
      <h2 className="text-2xl font-bold mb-4">{perfume.nombre}</h2>
      <div>Marca: {perfume.marca?.nombre}</div>
      <div>Categoría: {perfume.categoria?.nombre}</div>
      {/* Puedes agregar más campos según tu modelo */}
    </main>
  );
}
export default ProductDetail;
