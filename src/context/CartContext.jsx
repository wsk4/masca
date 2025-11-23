// src/context/CartContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { generarMensaje } from '../utils/GenerarMensaje'; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    // Recalcula el total cada vez que el carrito cambia
    useEffect(() => {
        const newTotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
        setTotal(newTotal);
    }, [cart]);

    const addToCart = (product, quantity = 1) => {
        const existingItem = cart.find(item => item.id === product.id);

        // Mapeo explícito y robusto de las propiedades del backend (perfume)
        const itemToSave = { 
            id: product.id,
            name: product.nombre, // Usamos 'nombre' del backend para guardar como 'name'
            price: product.precio,
            image: product.url,
            stock: product.stock,
        };

        if (existingItem) {
            setCart(cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            ));
        } else {
            // Guardamos el objeto mapeado itemToSave
            setCart([...cart, { ...itemToSave, quantity }]);
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