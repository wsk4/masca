import React from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import Button from "../../components/atoms/Button"; 
import { generarMensaje } from "../../utils/GenerarMensaje";
// NOTA: ASUMIMOS QUE ESTOS HOOKS EXISTEN Y ESTÁN CORRECTAMENTE IMPLEMENTADOS:
// import { useCart } from "../../context/CartContext"; 
// import { useAuth } from "../../context/AuthContext";

// --- REEMPLAZAR CON TU HOOK REAL ---
// Usando simulación de datos para que el código compile y muestre la estructura.
const useCart = () => ({
    cart: [ 
        { id: 1, name: 'Perfume Versace Eros', price: 75000, quantity: 1, total: 75000 }, 
        { id: 2, name: 'Paco Rabanne One Million', price: 68000, quantity: 2, total: 136000 }
    ],
    total: 211000,
    removeFromCart: (id) => { console.log(`Remover producto: ${id}`); },
    clearCart: () => { console.log("Vaciar carrito"); }
});
const useAuth = () => ({ user: { id: 1, nombre: 'Test User' } });
// -----------------------------------


function Cart() {
    const { cart, total, removeFromCart, clearCart } = useCart(); 
    const { user } = useAuth(); // Se puede usar para verificar si el usuario está logueado antes de checkout

    const handleRemove = (id) => {
        removeFromCart(id);
        generarMensaje("Producto eliminado", "info");
    };
    
    const handleClearCart = () => {
        clearCart();
        generarMensaje("Carrito vaciado", "warning");
    };

    const handleCheckout = () => {
        if (!user) {
            generarMensaje("Debes iniciar sesión para finalizar la compra.", "warning");
            // Aquí deberías navegar a /login
            return;
        }
        // Lógica de finalización: enviar datos a CompraService
        generarMensaje("Procesando compra...", "info");
        // Ejemplo: CompraService.create({ items: cart, userId: user.id });
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

            {/* Tabla de Productos */}
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

            {/* Resumen y Acciones Finales */}
            <div className="flex justify-between items-center mt-6 p-4 bg-theme-card border border-theme-border rounded-lg shadow-xl">
                
                {/* Botón Vaciar Carrito (Rojo) */}
                <Button 
                    text="Vaciar Carrito" 
                    onClick={handleClearCart} 
                    className="bg-red-600 text-white font-bold px-5 py-2 mr-3 hover:bg-red-700 appearance-none border-none transition-all"
                />

                {/* Total del Carrito */}
                <div className="text-xl font-bold text-white flex items-center">
                    Total: <span className="text-3xl ml-3 font-black text-theme-accent">{formatCurrency(total)}</span>
                </div>
                
                {/* Botón Finalizar Compra (Blanco/Negro) */}
                <Button 
                    text="Finalizar Compra" 
                    onClick={handleCheckout}
                    className="bg-white text-black font-bold px-5 py-2 appearance-none border-none transition-all"
                />
            </div>
        </main>
    );
}
export default Cart;