// RUTA: src/context/CartContext.jsx

import React, { createContext, useState, useContext } from 'react';

// Se crea el contexto. Piensa en esto como la "línea telefónica".
const CartContext = createContext();

// Esta es la función que tus componentes usarán para "conectarse" a la línea.
export const useCart = () => useContext(CartContext);

// Este es el proveedor que tiene el estado y las funciones (la "central telefónica").
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        // Valida que el producto sea correcto antes de hacer nada.
        if (!product || typeof product.id === 'undefined') {
            console.error("Se intentó agregar un producto inválido:", product);
            return;
        }

        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);

            if (existingItem) {
                // Si ya existe, aumenta la cantidad.
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si es nuevo, lo agrega con cantidad 1.
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Aquí se ponen a disposición el estado y las funciones para toda la app.
    const value = { cart, addToCart, removeFromCart, clearCart, total };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};