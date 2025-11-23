import React from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import Button from "../../components/atoms/Button"; // Usaremos el componente Button
import { generarMensaje } from "../../utils/GenerarMensaje";

// NOTA: Debes crear o asegurar la existencia de este archivo:
// import { useCart } from "../../context/CartContext"; 

// --- SIMULACIÓN DE CONTEXTO ---
// Nota: Dado que no tengo acceso a tu CartContext.jsx, usaré una simulación de datos
// para completar la estructura. En tu entorno, debes DESCOMENTAR Y USAR useCart.
const useCart = () => ({
    cart: [ 
        { id: 1, name: 'Perfume Versace', price: 95000, quantity: 1, total: 95000 }, 
        { id: 2, name: '1 Million', price: 68000, quantity: 2, total: 136000 }
    ],
    total: 231000,
    removeFromCart: (id) => {
        generarMensaje(`Producto ${id} removido (Simulado)`, "info");
    },
    clearCart: () => {
        generarMensaje("Carrito limpiado (Simulado)", "info");
    }
});
// ----------------------------


function Cart() {
    // Reemplazamos el useState vacío por el hook de contexto
    const { cart, total, removeFromCart, clearCart } = useCart(); 

    const handleRemove = (id) => {
        removeFromCart(id);
        generarMensaje("Producto eliminado", "info");
    };
    
    const handleClearCart = () => {
        clearCart();
        generarMensaje("Carrito vaciado", "warning");
    };

    // Estilo temático para el mensaje de carrito vacío
    if (!cart || cart.length === 0) return (
        <main className="min-h-screen flex items-start justify-center p-8 bg-theme-main">
            <div className="p-12 text-center text-xl text-theme-muted bg-theme-card rounded-xl border border-theme-border shadow-lg">
                Tu carrito está vacío. 🛒
            </div>
        </main>
    );

    // Formato de moneda CLP (Chilean Peso)
    const formatCurrency = (amount) => {
        return `$${(amount || 0).toLocaleString('es-CL')}`;
    }

    return (
        <main className="max-w-4xl mx-auto p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white border-l-4 border-white pl-4">Tu Carrito de Compras</h1>

            <DynamicTable
                columns={["ID", "Nombre", "Precio Unitario", "Cantidad", "Subtotal", "Acciones"]}
                data={cart.map(item => [
                    item.id, 
                    item.name, 
                    formatCurrency(item.price),
                    item.quantity,
                    formatCurrency(item.price * item.quantity),
                    // Botón de eliminar con estilos temáticos (Rojo/Blanco)
                    <button 
                        key={item.id} 
                        onClick={() => handleRemove(item.id)} 
                        className="bg-red-600 px-3 py-1 text-white rounded font-medium hover:bg-red-700 transition-colors"
                    >
                        Eliminar
                    </button>
                ])}
            />

            {/* Resumen y Acciones Finales */}
            <div className="flex justify-end items-center mt-6 p-4 bg-theme-card border border-theme-border rounded-lg shadow-xl">
                
                <div className="text-xl font-bold text-white mr-8">
                    Total: <span className="text-theme-accent">{formatCurrency(total)}</span>
                </div>
                
                <Button 
                    text="Vaciar Carrito" 
                    onClick={handleClearCart} 
                    className="bg-red-600 text-white font-bold px-5 py-2 mr-3 hover:bg-red-700 appearance-none border-none"
                />

                <Button 
                    text="Finalizar Compra" 
                    // Usamos el botón de acento (Blanco)
                    className="bg-white text-black font-bold px-5 py-2 appearance-none border-none"
                />
            </div>
        </main>
    );
}
export default Cart;