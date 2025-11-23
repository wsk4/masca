import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PerfumeService from "../../service/PerfumeService";
// Asumimos que estos módulos existen en la estructura de tu proyecto:
import { useCart } from "../../context/AuthContext"; 
import { generarMensaje } from "../../utils/GenerarMensaje"; 
import Image from "../../components/atoms/Image"; 

function ProductDetail() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState(null);
  // Inicialización del contexto del carrito para la funcionalidad
  const { addToCart } = useCart(); 

  useEffect(() => {
    PerfumeService.getById(id).then(setPerfume);
  }, [id]);

  const handleAddToCart = () => {
    if (perfume && perfume.stock > 0) {
        addToCart(perfume); 
        generarMensaje(`${perfume.nombre} agregado al carrito.`, "success");
    } else {
        generarMensaje("Producto sin stock.", "warning");
    }
  };

  // 1. Estilo para el estado de carga (Modo Oscuro)
  if (!perfume) return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-black text-white">
          Cargando detalle del perfume...
      </div>
  );

  // 2. Desestructuración de todos los campos del modelo Java Perfume
  const { nombre, descripcion, precio, stock, url, marca } = perfume;
  const isOutOfStock = stock <= 0;
  
  // Helper para formato de moneda
  const formatPrice = (price) => `$${price?.toFixed(2) ?? '0.00'}`;

  return (
    // 3. Contenedor principal: Fondo negro, texto blanco (Modo Oscuro)
    <main className="max-w-4xl mx-auto p-8 bg-black text-white min-h-screen">
        {/* Contenedor de tarjeta de detalle: Fondo gris oscuro, borde sutil */}
        <div className="flex flex-col md:flex-row gap-8 bg-gray-900 border border-gray-700 p-6 rounded-xl shadow-xl">
            
            {/* Columna Izquierda: Imagen (url) */}
            <div className="md:w-1/3 flex justify-center items-center bg-gray-800 p-6 rounded-lg shadow-inner">
                {url && (
                    <Image 
                        src={url} 
                        alt={nombre} 
                        className="max-h-80 w-auto object-contain rounded-lg"
                    />
                )}
            </div>

            {/* Columna Derecha: Detalles del Producto y Acciones */}
            <div className="md:w-2/3 space-y-4">
                
                {/* Nombre y Marca */}
                <h1 className="text-4xl font-extrabold text-white">
                    {nombre}
                </h1>
                <p className="text-xl text-gray-400 border-b border-gray-700 pb-2">
                    <strong className="text-white">Marca:</strong> {marca?.nombre}
                </p>

                {/* Descripción */}
                <div className="pt-2">
                    <strong className="text-gray-500 block mb-1">Descripción:</strong> 
                    <p className="text-gray-300">{descripcion}</p>
                </div>
                
                {/* Información clave (ID, Precio, Stock) */}
                <div className="space-y-2 pt-3">
                    <p>
                        <strong className="text-gray-500">ID del Producto:</strong> 
                        <span className="text-gray-400 ml-2">{perfume.id}</span>
                    </p>
                    
                    {/* Precio: Resaltado */}
                    <p className="text-4xl font-black text-white">
                        {formatPrice(precio)}
                    </p>
                    
                    {/* Stock: Indicador visual */}
                    <p className="text-lg">
                        <strong className="text-gray-400">Estado:</strong> 
                        <span className={`font-extrabold ml-2 ${isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
                            {isOutOfStock ? 'AGOTADO' : `${stock} UNIDADES`}
                        </span>
                    </p>
                </div>
                
                {/* Botón de Agregar al Carrito (funcional) */}
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