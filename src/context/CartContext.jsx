// src/context/CartContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el contexto
const CartContext = createContext();

// 2. Creamos un Hook personalizado para usar el contexto más fácilmente
export const useCart = () => useContext(CartContext);

// 3. Creamos el proveedor del contexto
export const CartProvider = ({ children }) => {
    // El estado del carrito
    const [cart, setCart] = useState([]);

    // --- DETECTIVE #1: Vigila cualquier cambio en el carrito ---
    // Este useEffect se ejecuta CADA VEZ que el estado 'cart' cambia.
    useEffect(() => {
        console.log('🛒 ESTADO DEL CARRITO ACTUALIZADO:', cart);
    }, [cart]);
    // -----------------------------------------------------------

    const addToCart = (product) => {
        console.log('▶️ addToCart: Se recibió el producto:', product);

        if (!product || typeof product.id === 'undefined') {
            console.error('❌ ERROR: Se intentó agregar un producto inválido.', product);
            return;
        }

        setCart((prevCart) => {
            console.log('   🔄 Estado ANTERIOR:', prevCart);
            const exists = prevCart.find((item) => item.id === product.id);

            if (exists) {
                // Si el item ya existe, aumenta la cantidad
                const newCart = prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
                console.log('   ✅ Estado NUEVO (cantidad aumentada):', newCart);
                return newCart;
            } else {
                // Si es un item nuevo, lo agrega al array
                const newCart = [...prevCart, { ...product, quantity: 1 }];
                console.log('   ✅ Estado NUEVO (producto agregado):', newCart);
                return newCart;
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    // Calculamos el total cada vez que el componente se renderiza
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
            {children}
        </CartContext.Provider>
    );
};