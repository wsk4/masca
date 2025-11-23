import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PerfumeService from "../../service/PerfumeService";
import { useCart } from "../../context/CartContext"; // Necesario para agregar al carrito
import { generarMensaje } from "../../utils/GenerarMensaje"; // Para notificaciones
import Image from "../../components/atoms/Image"; // Para mostrar la imagen

function ProductDetail() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  const { addToCart } = useCart(); // Obtener función para agregar al carrito

  useEffect(() => {
    // Manejo de carga de datos
    PerfumeService.getById(id).then(setPerfume);
  }, [id]);

  const handleAddToCart = () => {
    if (perfume && perfume.stock > 0) {
        // Lógica de agregar al contexto
        addToCart(perfume); 
        generarMensaje(`${perfume.nombre} agregado al carrito.`, "success");
    } else {
        generarMensaje("Producto sin stock.", "warning");
    }
  };

  // Estilo para el estado de carga (Modo Oscuro)
  if (!perfume) return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-black text-white">
          Cargando detalle del perfume...
      </div>
  );

  // Desestructuración para acceso limpio a todos los campos del modelo Perfume
  const { nombre, descripcion, precio, stock, url, marca } = perfume;
  const isOutOfStock = stock <= 0;
  
  // Helper para formato de moneda (simplificado a $XX.XX)
  const formatPrice = (price) => `$${price?.toFixed(2) ?? '0.00'}`;

  return (
    // Contenedor principal con fondo negro, texto blanco (Modo Oscuro)
    <main className="max-w-4xl mx-auto p-8 bg-black text-white min-h-screen">
        <div className="flex flex-col md:flex-row gap-8 bg-gray-900 border border-gray-700 p-6 rounded-lg shadow-xl">
            
            {/* Columna de Imagen (url) */}
            <div className="md:w-1/3 flex justify-center items-center bg-gray-800 p-4 rounded-lg">
                {url && (
                    <Image 
                        src={url} 
                        alt={nombre} 
                        className="max-h-80 w-auto object-contain rounded-lg"
                    />
                )}
            </div>

            {/* Columna de Detalles */}
            <div className="md:w-2/3 space-y-5">
                
                <h2 className="text-4xl font-extrabold text-white">
                    {nombre}
                </h2>

                <div className="space-y-2 text-lg">
                    {/* ID del perfume */}
                    <p><strong className="text-gray-500">ID:</strong> <span className="text-gray-400">{perfume.id}</span></p>

                    {/* Descripción */}
                    <p className="text-gray-300 italic pt-2">{descripcion}</p>

                    {/* Marca */}
                    <p>
                        <strong className="text-gray-400">Marca:</strong> {marca?.nombre}
                    </p>
                    
                    {/* Precio */}
                    <p className="text-3xl font-black text-white pt-4">
                        {formatPrice(precio)}
                    </p>
                    
                    {/* Stock */}
                    <p className="text-base">
                        <strong className="text-gray-400">Stock:</strong> 
                        <span className={`font-semibold ml-1 ${isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
                            {isOutOfStock ? 'AGOTADO' : `${stock} unidades disponibles`}
                        </span>
                    </p>
                </div>
                
                {/* Botón de Agregar al Carrito */}
                <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`mt-6 w-full py-3 px-4 rounded-lg font-bold text-lg transition-all duration-200
                                ${isOutOfStock 
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-70' 
                                    : 'bg-white text-black hover:bg-gray-200 active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                                }
                    `}
                >
                    {isOutOfStock ? 'SIN STOCK' : 'AGREGAR AL CARRITO'}
                </button>
            </div>
        </div>
    </main>
  );
}
export default ProductDetail;