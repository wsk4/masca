import React from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import Button from "../../components/atoms/Button"; 
import { generarMensaje } from "../../utils/GenerarMensaje";
import { useNavigate } from "react-router-dom"; 
// IMPORTAR HOOKS Y SERVICIOS REALES
import { useCart } from "../../context/CartContext"; 
import { useAuth } from "../../context/AuthContext";
import CompraService from "../../service/CompraService";


function Cart() {
    // 1. OBTENER DATOS REALES DEL CONTEXTO
    const { cart, total, removeFromCart, clearCart } = useCart(); 
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        removeFromCart(id);
        generarMensaje("Producto eliminado", "info");
    };
    
    const handleClearCart = () => {
        clearCart();
        generarMensaje("Carrito vaciado", "warning");
    };

    // 2. FUNCIÓN DE CHECKOUT (CONEXIÓN A LA API)
    const handleCheckout = async () => {
        if (!user) {
            generarMensaje("Debes iniciar sesión para finalizar la compra.", "warning");
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            generarMensaje("El carrito está vacío.", "warning");
            return;
        }

        generarMensaje("Procesando compra...", "info");
        
        try {
            // Estructura de datos que tu API CompraService.create espera
            const orderData = {
                usuarioId: user.id, // ID del usuario autenticado
                total: total,
                // Mapear los ítems del carrito al formato de detalle de compra de la API
                detalleCompras: cart.map(item => ({
                    productoId: item.id,
                    cantidad: item.quantity,
                    precioUnitario: item.price
                })),
                // Aquí deberías añadir campos como direccionId, estadoId si son obligatorios en tu API
            };

            await CompraService.create(orderData); // Llama al servicio que usa axios
            clearCart(); // Limpiar carrito local tras éxito
            generarMensaje("¡Compra realizada con éxito!", "success");
            navigate('/compras'); // Redirigir a "Mis Compras"
            
        } catch (error) {
            generarMensaje("Error al procesar la compra. Verifica tu conexión o sesión.", "error");
            console.error("Checkout Error:", error);
        }
    };

    const formatCurrency = (amount) => {
        return `$${(amount || 0).toLocaleString('es-CL')}`;
    }

    // Mensaje de carrito vacío
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