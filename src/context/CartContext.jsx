// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { generarMensaje } from '../utils/GenerarMensaje'; // Asume esta ruta

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // Recalcula el total cada vez que el carrito cambia
    useEffect(() => {
        const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotal(newTotal);
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity }]);
        }
        generarMensaje('¡Producto agregado!', 'success');
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };
    
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};