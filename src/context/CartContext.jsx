import React, { createContext, useContext, useState, useEffect } from 'react';
import { generarMensaje } from '../utils/GenerarMensaje'; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newTotal = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
        setTotal(newTotal);
    }, [cart]);

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: Math.min(newQuantity, item.stock) } : item
        ));
    };

    const increaseQuantity = (id) => {
        const item = cart.find(i => i.id === id);
        if (item && item.quantity < item.stock) {
            updateQuantity(id, item.quantity + 1);
        } else if (item) {
            generarMensaje(`Stock máximo alcanzado para ${item.name}.`, 'warning');
        }
    };
    
    const decreaseQuantity = (id) => {
        const item = cart.find(i => i.id === id);
        if (item && item.quantity > 1) {
            updateQuantity(id, item.quantity - 1);
        } else if (item) {
            removeFromCart(id);
        }
    };

    const addToCart = (product, quantity = 1) => {
        // ... (misma lógica de adición de producto) ...
        const existingItem = cart.find(item => item.id === product.id);
        const itemToSave = { id: product.id, name: product.nombre, price: product.precio, stock: product.stock, image: product.url };

        if (existingItem) {
            if (existingItem.quantity + quantity <= existingItem.stock) {
                setCart(cart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                ));
            } else {
                generarMensaje(`Solo quedan ${existingItem.stock - existingItem.quantity} unidades más.`, 'warning');
            }
        } else {
            setCart([...cart, { ...itemToSave, quantity: Math.min(quantity, itemToSave.stock || 99) }]);
        }
        generarMensaje('¡Producto agregado!', 'success');
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
        generarMensaje('Producto eliminado', 'info');
    };
    
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    );
};