import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // 1. Estado del carrito: Inicializa leyendo desde localStorage
    const [cart, setCart] = useState(() => {
        const localCart = localStorage.getItem('cart');
        return localCart ? JSON.parse(localCart) : [];
    });

    // 2. Estado para el total
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Recalcular el total cada vez que el carrito cambia
        const newTotal = cart.reduce(
            // Asume que cada item tiene un 'price' y 'quantity'
            (sum, item) => sum + (item.precio * item.quantity), 
            0
        );
        setTotal(newTotal);

        // Persistir el carrito en localStorage para que persista entre sesiones
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // 3. Función para agregar productos
    const addToCart = useCallback((product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                // Si existe, incrementa la cantidad
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si es nuevo, agrégalo con cantidad 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    }, []);

    // 4. Función para remover productos
    const removeFromCart = useCallback((id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    }, []);
    
    // 5. Función para limpiar todo el carrito
    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    // 6. Valor del contexto
    const contextValue = {
        cart,
        total,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;