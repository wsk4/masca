import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from '../../context/CartContext';

// Componente auxiliar para probar el hook useCart
const TestComponent = () => {
    const { cart, total, addToCart, removeFromCart, clearCart } = useCart();
    return (
        <div>
            <div data-testid="cart-total">{total}</div> 
            <div data-testid="cart-count">{cart.length}</div>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>
                        <span data-testid="item-qty">{item.quantity}</span>
                        <button aria-label={`remove-${item.id}`} onClick={() => removeFromCart(item.id)}>X</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => addToCart({ id: 1, name: 'Perfume A', precio: 100 })}>Add A</button>
            <button onClick={clearCart}>Vaciar</button>
        </div>
    );
};

describe('Contexto CartContext', () => {
    beforeEach(() => { localStorage.clear(); });

    it('inicia con el carrito vacío', () => {
        render(<CartProvider><TestComponent /></CartProvider>);
        expect(screen.getByTestId('cart-total')).toHaveTextContent('0');
    });

    it('agrega productos y actualiza el total', async () => {
        const user = userEvent.setup();
        render(<CartProvider><TestComponent /></CartProvider>);

        await user.click(screen.getByText('Add A'));
        expect(await screen.findByTestId('cart-total')).toHaveTextContent('100');
    });

    it('aumenta cantidad si se agrega el mismo producto', async () => {
        const user = userEvent.setup();
        render(<CartProvider><TestComponent /></CartProvider>);
        const btnAdd = screen.getByText('Add A');
        
        await user.click(btnAdd); // Cantidad 1
        expect(await screen.findByTestId('item-qty')).toHaveTextContent('1');

        await user.click(btnAdd); // Cantidad 2
        expect(await screen.findByTestId('cart-total')).toHaveTextContent('200'); 
        expect(screen.getByTestId('item-qty')).toHaveTextContent('2'); 
    });
});