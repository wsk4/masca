import React from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import Button from "../../components/atoms/Button"; // Usaremos el componente Button
import { generarMensaje } from "../../utils/GenerarMensaje";

// NOTA IMPORTANTE:
// Para que esto funcione, debes descomentar y usar tu hook real:
// import { useCart } from "../../context/CartContext"; 

// --- SIMULACIÓN DE CONTEXTO (ELIMINAR ESTE BLOQUE AL USAR EL HOOK REAL) ---
const useCart = () => ({
    // Datos de ejemplo
    cart: [ 
        { id: 1, name: 'Perfume Versace Eros', price: 75000, quantity: 1, total: 75000 }, 
        { id: 2, name: 'Paco Rabanne One Million', price: 68000, quantity: 2, total: 136000 }
    ],
    total: 211000,
    removeFromCart: (id) => { console.log(`Remover producto: ${id}`); },
    clearCart: () => { console.log("Vaciar carrito"); }
});
// --- FIN SIMULACIÓN ---

function Cart() {
    // Reemplazamos el estado local por el hook de contexto
    const { cart, total, removeFromCart, clearCart } = useCart(); 

    const handleRemove = (id) => {
        removeFromCart(id);
        // El contexto se encarga de actualizar el estado, aquí solo notificamos al usuario
        generarMensaje("Producto eliminado", "info");
    };
    
    const handleClearCart = () => {
        clearCart();
        generarMensaje("Carrito vaciado", "warning");
    };

    const formatCurrency = (amount) => {
        return `$${(amount || 0).toLocaleString('es-CL')}`;
    }

    // Estilo temático para el mensaje de carrito vacío
    if (!cart || cart.length === 0) return (
        <main className="min-h-screen flex items-start justify-center p-8 bg-theme-main">
            <div className="p-12 text-center text-xl text-theme-muted bg-theme-card rounded-xl border border-theme-border shadow-lg">
                Tu carrito está vacío. 🛒
            </div>
        </main>
    );

    return (
        <main className="max-w-4xl mx-auto p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-white border-l-4 border-white pl-4">Tu Carrito de Compras</h1>

            {/* Tabla de Productos (Ya estilizada para Dark Mode) */}
            <DynamicTable
                columns={["ID", "Nombre", "Precio Unitario", "Cantidad", "Subtotal", "Acciones"]}
                data={cart.map(item => [
                    item.id, 
                    item.name, 
                    formatCurrency(item.price),
                    item.quantity,
                    formatCurrency(item.price * item.quantity),
                    // Botón de eliminar
                    <button 
                        key={item.id} 
                        onClick={() => handleRemove(item.id)} 
                        className="bg-red-600 px-3 py-1 text-white rounded font-medium hover:bg-red-700 transition-colors"
                    >
                        Eliminar
                    </button>
                ])}
            />

            {/* Resumen y Acciones Finales (Fondo oscuro de tarjeta) */}
            <div className="flex justify-between items-center mt-6 p-4 bg-theme-card border border-theme-border rounded-lg shadow-xl">
                
                {/* Botón para Vaciar Carrito (Rojo) */}
                <Button 
                    text="Vaciar Carrito" 
                    onClick={handleClearCart} 
                    className="bg-red-600 text-white font-bold px-5 py-2 hover:bg-red-700 appearance-none border-none transition-all"
                />

                {/* Total del Carrito */}
                <div className="text-xl font-bold text-white flex items-center">
                    Total: <span className="text-3xl ml-3 font-black text-theme-accent">{formatCurrency(total)}</span>
                </div>
                
                {/* Botón Finalizar Compra (Blanco/Negro de Alto Contraste) */}
                <Button 
                    text="Finalizar Compra" 
                    className="bg-white text-black font-bold px-5 py-2 appearance-none border-none transition-all"
                />
            </div>
        </main>
    );
}
export default Cart;