import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // AGREGAMOS waitFor
import { CartProvider, useCart } from '../../context/CartContext';

// --- Componente Dummy para probar el consumo del contexto ---
const TestComponent = () => {
    const { cart, total, addToCart, removeFromCart, clearCart } = useCart();

    return (
        <div>
            {/* El total debe ser renderizado como string */}
            <div data-testid="cart-total">{total.toString()}</div> 
            <div data-testid="cart-count">{cart.length}</div>
            
            <ul>
                {cart.map(item => (
                    <li key={item.id} data-testid={`item-${item.id}`}>
                        {item.name} | Qty: {item.quantity} {/* Separador claro */}
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

    it('agrega un producto nuevo al carrito y actualiza el total', async () => { // ASYNC
        render(<CartProvider><TestComponent /></CartProvider>);

        fireEvent.click(screen.getByText('Agregar A ($100)'));

        await waitFor(() => { // AÑADIMOS WAITFOR
            expect(screen.getByTestId('cart-count').textContent).toBe('1');
            expect(screen.getByTestId('cart-total').textContent).toBe('100');
            expect(screen.getByText(/Perfume A/i)).toBeTruthy();
        });
    });

    it('aumenta la cantidad si se agrega el mismo producto', async () => { // ASYNC
        render(<CartProvider><TestComponent /></CartProvider>);

        const btnAddA = screen.getByText('Agregar A ($100)');
        
        fireEvent.click(btnAddA);
        fireEvent.click(btnAddA);

        await waitFor(() => { // AÑADIMOS WAITFOR
            // Sigue siendo 1 item único
            expect(screen.getByTestId('cart-count').textContent).toBe('1'); 
            // El total debe ser 200
            expect(screen.getByTestId('cart-total').textContent).toBe('200');
            // Verificamos el texto de cantidad
            expect(screen.getByText(/Perfume A/i).textContent).toContain('Qty: 2');
        });
    });

    it('elimina un producto del carrito', async () => { // ASYNC
        render(<CartProvider><TestComponent /></CartProvider>);

        fireEvent.click(screen.getByText('Agregar A ($100)'));
        fireEvent.click(screen.getByText('Agregar B ($200)'));

        await waitFor(() => {
             expect(screen.getByTestId('cart-total').textContent).toBe('300');
        });

        // Eliminamos el producto A
        fireEvent.click(screen.getByLabelText('remove-1'));

        await waitFor(() => { // AÑADIMOS WAITFOR
            expect(screen.getByTestId('cart-count').textContent).toBe('1');
            expect(screen.getByTestId('cart-total').textContent).toBe('200');
            // El item A ya no debe estar
            expect(screen.queryByTestId('item-1')).toBeNull(); 
        });
    });

    it('vacía todo el carrito con clearCart', async () => { // ASYNC
        render(<CartProvider><TestComponent /></CartProvider>);

        fireEvent.click(screen.getByText('Agregar A ($100)'));
        fireEvent.click(screen.getByText('Vaciar Carrito'));

        await waitFor(() => { // AÑADIMOS WAITFOR
            expect(screen.getByTestId('cart-count').textContent).toBe('0');
            expect(screen.getByTestId('cart-total').textContent).toBe('0');
        });
    });
});