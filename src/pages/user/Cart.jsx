import React, { useState } from "react";
import DynamicTable from "../../components/molecules/DynamicTable";
import { generarMensaje } from "../../utils/GenerarMensaje";

// Simulación local (integra con contexto o backend si existe)
function Cart() {
    const [cart, setCart] = useState([]);

    const handleRemove = (id) => {
        setCart(cart.filter(item => item.id !== id));
        generarMensaje("Producto eliminado", "info");
    };

    if (!cart.length) return <main className="p-8 text-center">Tu carrito está vacío.</main>;

    return (
        <main className="max-w-3xl mx-auto p-8">
            <DynamicTable
                columns={["ID", "Nombre", "Precio", "Acciones"]}
                data={cart.map(item => [
                    item.id, item.nombre, item.precio ?? "",
                    <button onClick={() => handleRemove(item.id)} className="bg-red-600 px-2 py-1 text-white rounded">Eliminar</button>
                ])}
            />
        </main>
    );
}
export default Cart;
