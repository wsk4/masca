import React from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import Button from "../../components/atoms/Button"; 
import { generarMensaje } from "../../utils/GenerarMensaje";
import { useCart } from "../../context/CartContext"; 
import { useAuth } from "../../context/AuthContext";
import CompraService from "../../service/CompraService";
import { useNavigate } from "react-router-dom";


function Cart() {
    const { cart, total, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useCart(); 
    const { user } = useAuth();
    const navigate = useNavigate();

    // ... (handleRemove, handleClearCart, formatCurrency) ...
    const handleRemove = (id) => {
        removeFromCart(id);
        generarMensaje("Producto eliminado", "info");
    };
    
    const handleClearCart = () => {
        clearCart();
        generarMensaje("Carrito vaciado", "warning");
    };

    const formatCurrency = (amount) => {
        return `$${(amount || 0).toLocaleString('es-CL')}`;
    }
    
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
            // ESTRUCTURA DE DATOS FINAL (Asegurando el formato de fecha ISO completo)
            const orderData = {
                // Relaciones ManyToOne: Enviadas como objetos { id: X }.
                usuario: { id: user.id }, 
                estadoCompra: { id: 1 },   // ID inicial
                estadoEnvio: { id: 1 },    // ID inicial
                
                // CRÍTICO: Usamos new Date().toJSON() para un formato ISO que Spring acepta sin problemas
                fechaCompra: new Date().toJSON(), 
                
                // DetalleCompra: Lista de Productos con la estructura { producto: { id: X } }
                detalleCompras: cart.map(item => ({
                    producto: { id: item.id }, 
                    cantidad: item.quantity,
                    precioUnitario: item.price
                })),
            };

            await CompraService.create(orderData);
            clearCart();
            generarMensaje("¡Compra realizada con éxito!", "success");
            navigate('/compras'); 
            
        } catch (error) {
            // Si esto falla, el error es que los IDs 1 no existen o hay un error de validación de JPA no mapeado.
            generarMensaje("Error al procesar la compra. Revisa que los IDs 1 (estados) existan en tu BD.", "error");
            console.error("Checkout Error:", error);
        }
    };
    
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
                columns={["ID", "Nombre", "Precio Unitario", "Cantidad", "Subtotal", "Eliminar"]}
                data={cart.map(item => [
                    item.id, 
                    item.name, 
                    formatCurrency(item.price),
                    // Columna de Cantidad (Editar)
                    <div key={`qty-${item.id}`} className="flex items-center space-x-2">
                        <button 
                            onClick={() => decreaseQuantity(item.id)}
                            className="bg-theme-border text-white px-2 py-1 rounded-l hover:bg-zinc-700 font-bold appearance-none border-none"
                        >
                            -
                        </button>
                        <span className="text-white font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                            onClick={() => increaseQuantity(item.id)} 
                            className="bg-theme-border text-white px-2 py-1 rounded-r hover:bg-zinc-700 font-bold appearance-none border-none"
                            disabled={item.quantity >= item.stock}
                        >
                            +
                        </button>
                    </div>,
                    formatCurrency(item.price * item.quantity),
                    // Botón de eliminar
                    <button 
                        key={`del-${item.id}`} 
                        onClick={() => handleRemove(item.id)} 
                        className="bg-red-600 px-3 py-1 text-white rounded font-medium hover:bg-red-700 transition-colors"
                    >
                        Eliminar
                    </button>
                ])}
            />

            <div className="flex justify-between items-center mt-6 p-4 bg-theme-card border border-theme-border rounded-lg shadow-xl">
                
                <Button 
                    text="Vaciar Carrito" 
                    onClick={handleClearCart} 
                    className="bg-red-600 text-white font-bold px-5 py-2 mr-3 hover:bg-red-700 appearance-none border-none transition-all"
                />

                <div className="text-xl font-bold text-white flex items-center">
                    Total: <span className="text-3xl ml-3 font-black text-theme-accent">{formatCurrency(total)}</span>
                </div>
                
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