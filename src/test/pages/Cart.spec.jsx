import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Cart from '../../pages/Cart'; 
import { AuthProvider } from '../../context/AuthContext';


const mockNavigate = jasmine.createSpy('useNavigate');
const mockGenerarMensaje = jasmine.createSpy('generarMensaje');
const mockCompraService = { create: jasmine.createSpy('create') };

const mockCart = {
    cart: [],
    total: 0,
    removeFromCart: jasmine.createSpy('removeFromCart'),
    clearCart: jasmine.createSpy('clearCart'),
    increaseQuantity: jasmine.createSpy('increaseQuantity'),
    decreaseQuantity: jasmine.createSpy('decreaseQuantity'),
};
const mockUser = { id: 100, name: 'Test User' };


jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));
jest.mock('../../utils/GenerarMensaje', () => ({
    generarMensaje: mockGenerarMensaje,
}));
jest.mock('../../service/CompraService', () => mockCompraService);
jest.mock('../../context/AuthContext', () => ({
    useAuth: jest.fn(),
    AuthProvider: ({ children }) => <div>{children}</div> 
}));
jest.mock('../../context/CartContext', () => ({
    useCart: jest.fn(),
}));


const renderCart = (authState = { user: null }, cartState = { cart: [], total: 0 }) => {
    require('../../context/AuthContext').useAuth.mockReturnValue(authState);
    require('../../context/CartContext').useCart.mockReturnValue({ 
        ...mockCart, 
        ...cartState 
    });

    return render(
        <MemoryRouter>
            <Cart />
        </MemoryRouter>
    );
};


describe('Pagina Cart (Checkout Logic)', () => {

    const mockItem = { 
        id: 10, 
        name: 'Perfume Test', 
        price: 1000, 
        quantity: 2, 
        stock: 5,
        item: { id: 10 } 
    };
    const mockCartPopulated = { 
        cart: [mockItem], 
        total: 2000,
    };


    beforeEach(() => {
        mockGenerarMensaje.calls.reset();
        mockCompraService.create.calls.reset();
        mockNavigate.calls.reset();
    });


    it('muestra mensaje "carrito vacío" cuando cart.length es 0', () => {
        renderCart();
        expect(screen.getByText('Tu carrito está vacío. 🛒')).toBeTruthy();
    });

    it('renderiza la tabla y el total cuando hay productos', () => {
        renderCart({ user: mockUser }, mockCartPopulated);
        
        expect(screen.getByText('Perfume Test')).toBeTruthy();
        
        expect(screen.getByText('$2,000')).toBeTruthy();
        
        expect(screen.getByRole('button', { name: /Finalizar Compra/i })).toBeTruthy();
    });


    it('llama a removeFromCart y muestra mensaje al clickear Eliminar', () => {
        renderCart({ user: mockUser }, mockCartPopulated);
        
        const removeButton = screen.getByRole('button', { name: 'Eliminar' });
        fireEvent.click(removeButton);

        expect(mockCart.removeFromCart).toHaveBeenCalledWith(10);
        expect(mockGenerarMensaje).toHaveBeenCalledWith("Producto eliminado", "info");
    });
    
    it('llama a clearCart y muestra mensaje al clickear Vaciar Carrito', () => {
        renderCart({ user: mockUser }, mockCartPopulated);
        
        fireEvent.click(screen.getByRole('button', { name: 'Vaciar Carrito' }));

        expect(mockCart.clearCart).toHaveBeenCalled();
        expect(mockGenerarMensaje).toHaveBeenCalledWith("Carrito vaciado", "warning");
    });



    it('CHECKOUT: Si no hay usuario, navega a /login', async () => {
        renderCart({ user: null }, mockCartPopulated);
        
        fireEvent.click(screen.getByRole('button', { name: /Finalizar Compra/i }));
        
        expect(mockGenerarMensaje).toHaveBeenCalledWith("Debes iniciar sesión para finalizar la compra.", "warning");
        
        expect(mockNavigate).toHaveBeenCalledWith('/login');
        
        expect(mockCompraService.create).not.toHaveBeenCalled();
    });
    
    it('CHECKOUT EXITOSO: Llama a la API, vacía carrito y navega a /compras', async () => {
        mockCompraService.create.and.returnValue(Promise.resolve({ id: 101 }));
        
        renderCart({ user: mockUser }, mockCartPopulated);

        fireEvent.click(screen.getByRole('button', { name: /Finalizar Compra/i }));
        
        await waitFor(() => {
            expect(mockCompraService.create).toHaveBeenCalled();
        });
        
        expect(mockCart.clearCart).toHaveBeenCalled();
        expect(mockGenerarMensaje).toHaveBeenCalledWith("¡Compra realizada con éxito!", "success");

        expect(mockNavigate).toHaveBeenCalledWith('/compras');
    });

    it('CHECKOUT FALLIDO: Muestra mensaje de error sin vaciar carrito', async () => {
        mockCompraService.create.and.returnValue(Promise.reject(new Error('BD Error')));
        
        renderCart({ user: mockUser }, mockCartPopulated);

        fireEvent.click(screen.getByRole('button', { name: /Finalizar Compra/i }));
        
        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith(
                "Error al procesar la compra. Revisa que los IDs 1 (estados) existan en tu BD.", "error"
            );
        });

        expect(mockCart.clearCart).not.toHaveBeenCalled();
    });
});