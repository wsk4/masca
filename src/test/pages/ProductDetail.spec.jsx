import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetail from '../../pages/ProductDetail.jsx';
import { CartProvider } from '../../context/CartContext.jsx';
import products from '../../data/Products.js';

function renderWithProviders({ route }) {
    window.history.pushState({}, 'Test page', route);

    return render(
        <CartProvider>
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/products/:id" element={<ProductDetail />} />
                </Routes>
            </MemoryRouter>
        </CartProvider>
    );
}

describe('ProductDetail Page', () => {
    it('muestra un producto existente correctamente', () => {
        const product = products[0];
        renderWithProviders({ route: `/products/${product.id}` });

        expect(screen.getByText(product.name)).toBeTruthy();
        expect(screen.getByText(product.description)).toBeTruthy();
        expect(
            screen.getByText(
                product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
            )
        ).toBeTruthy();
    });

    it('muestra mensaje de producto no encontrado', () => {
        renderWithProviders({ route: `/products/999999` }); 

        expect(screen.getByText('Producto no encontrado')).toBeTruthy();
    });

    it('agrega un producto al carrito al hacer click', () => {
        const product = products[0];
        renderWithProviders({ route: `/products/${product.id}` });

        const addButton = screen.getByRole('button', { name: /agregar al carrito/i });
        fireEvent.click(addButton);

        const originalAlert = window.alert;
        window.alert = jasmine.createSpy('alert');

        fireEvent.click(addButton);
        expect(window.alert).toHaveBeenCalledWith('¡Producto agregado!');

        window.alert = originalAlert;
    });
});