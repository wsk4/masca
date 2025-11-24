import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';

const TestComponent = () => {
    const { cart, total, addToCart, removeFromCart, clearCart } = useCart();

    return (
        <div>
            <div data-testid="cart-total">{total}</div>
            <div data-testid="cart-count">{cart.length}</div>
            
            <ul>
                {cart.map(item => (
                    <li key={item.id} data-testid={`item-${item.id}`}>
                        {item.name} - Qty: {item.quantity}
                        <button aria-label={`remove-${item.id}`} onClick={() => removeFromCart(item.id)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={() => addToCart({ id: 1, name: 'Perfume A', precio: 100 })}>
                Agregar A ($100)
            </button>
            <button onClick={() => addToCart({ id: 2, name: 'Perfume B', precio: 200 })}>
                Agregar B ($200)
            </button>
            <button onClick={clearCart}>
                Vaciar Carrito
            </button>
        </div>
    );
};

describe('Contexto CartContext', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('inicia con el carrito vacío y total en 0', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        expect(screen.getByTestId('cart-total').textContent).toBe('0');
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
    });

    it('agrega un producto nuevo al carrito y actualiza el total', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const btnAddA = screen.getByText('Agregar A ($100)');
        fireEvent.click(btnAddA);

        expect(screen.getByTestId('cart-count').textContent).toBe('1');
        expect(screen.getByTestId('cart-total').textContent).toBe('100');
        expect(screen.getByTestId('item-1').textContent).toContain('Perfume A');
    });

    it('aumenta la cantidad si se agrega el mismo producto', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const btnAddA = screen.getByText('Agregar A ($100)');
        
        // Click 1 vez
        fireEvent.click(btnAddA);
        // Click 2 veces
        fireEvent.click(btnAddA);

        expect(screen.getByTestId('cart-count').textContent).toBe('1');
        
        expect(screen.getByTestId('cart-total').textContent).toBe('200');
        
        expect(screen.getByTestId('item-1').textContent).toContain('Qty: 2');
    });

    it('elimina un producto del carrito', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('Agregar A ($100)'));
        fireEvent.click(screen.getByText('Agregar B ($200)'));

        expect(screen.getByTestId('cart-count').textContent).toBe('2');
        expect(screen.getByTestId('cart-total').textContent).toBe('300'); // 100 + 200

        const btnRemoveA = screen.getByLabelText('remove-1');
        fireEvent.click(btnRemoveA);

        expect(screen.getByTestId('cart-count').textContent).toBe('1');
        expect(screen.getByTestId('cart-total').textContent).toBe('200');
        expect(screen.queryByTestId('item-1')).toBeNull();
    });

    it('vacía todo el carrito con clearCart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('Agregar A ($100)'));
        fireEvent.click(screen.getByText('Agregar B ($200)'));

        fireEvent.click(screen.getByText('Vaciar Carrito'));

        expect(screen.getByTestId('cart-count').textContent).toBe('0');
        expect(screen.getByTestId('cart-total').textContent).toBe('0');
    });
});