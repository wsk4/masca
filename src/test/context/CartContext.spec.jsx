import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';

// --- Componente Dummy para probar el consumo del contexto ---
const TestComponent = () => {
    const { cart, total, addToCart, removeFromCart, clearCart } = useCart();

    return (
        <div>
            {/* Renderizado explícito de los valores para los tests */}
            <div data-testid="cart-total">{total.toString()}</div> 
            <div data-testid="cart-count">{cart.length}</div>
            
            <ul>
                {cart.map(item => (
                    // Usamos data-testid para encontrar el nombre y la cantidad fácilmente
                    <li key={item.id} data-testid={`item-${item.id}`}>
                        <span data-testid="item-name">{item.name}</span> | Qty: <span data-testid="item-qty">{item.quantity}</span>
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
        render(<CartProvider><TestComponent /></CartProvider>);
        expect(screen.getByTestId('cart-total').textContent).toBe('0');
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
    });

    it('agrega un producto nuevo al carrito y actualiza el total', async () => {
        render(<CartProvider><TestComponent /></CartProvider>);

        fireEvent.click(screen.getByText('Agregar A ($100)'));

        // Esperamos que los valores y el nombre se sincronicen
        await waitFor(() => {
            // Se corrige el error /Perfume A/i
            expect(screen.getByTestId('item-name').textContent).toBe('Perfume A'); 
            expect(screen.getByTestId('cart-count').textContent).toBe('1');
            expect(screen.getByTestId('cart-total').textContent).toBe('100');
        });
    });

    // --- CORRECCIÓN DEL FALLO CRÍTICO (Expected 100 to be 200) ---
    it('aumenta la cantidad si se agrega el mismo producto', async () => {
        render(<CartProvider><TestComponent /></CartProvider>);

        const btnAddA = screen.getByText('Agregar A ($100)');
        
        // 1. Primer click: Agrega 1
        fireEvent.click(btnAddA);
        
        // 2. Esperamos que el estado se actualice a cantidad 1 antes del segundo click
        await waitFor(() => {
            expect(screen.getByTestId('item-qty').textContent).toBe('1');
        });

        // 3. Segundo click: Debería sumar 1
        fireEvent.click(btnAddA);

        // 4. Esperamos el estado final: Total 200, Cantidad 2
        await waitFor(() => {
            expect(screen.getByTestId('cart-total').textContent).toBe('200'); 
            expect(screen.getByTestId('item-qty').textContent).toBe('2'); 
        });
    });

    it('elimina un producto del carrito', async () => {
        render(<CartProvider><TestComponent /></CartProvider>);

        fireEvent.click(screen.getByText('Agregar A ($100)'));
        fireEvent.click(screen.getByText('Agregar B ($200)'));

        await waitFor(() => {
             expect(screen.getByTestId('cart-total').textContent).toBe('300');
        });

        // Eliminamos el producto A
        fireEvent.click(screen.getByLabelText('remove-1'));

        await waitFor(() => {
            expect(screen.getByTestId('cart-total').textContent).toBe('200');
            expect(screen.queryByTestId('item-1')).toBeNull(); 
        });
    });

    it('vacía todo el carrito con clearCart', async () => {
        render(<CartProvider><TestComponent /></CartProvider>);

        fireEvent.click(screen.getByText('Agregar A ($100)'));
        fireEvent.click(screen.getByText('Vaciar Carrito'));

        await waitFor(() => {
            expect(screen.getByTestId('cart-count').textContent).toBe('0');
            expect(screen.getByTestId('cart-total').textContent).toBe('0');
        });
    });
});