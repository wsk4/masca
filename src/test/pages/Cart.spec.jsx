import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ⚠️ IMPORTANTE: Ajusta esta ruta a tu componente Cart.jsx
import Cart from '../../pages/Cart'; 
import { AuthProvider } from '../../context/AuthContext';


// --- 1. SPIES Y MOCKS DE DEPENDENCIAS EXTERNAS ---
const mockNavigate = jasmine.createSpy('useNavigate');
const mockGenerarMensaje = jasmine.createSpy('generarMensaje');
const mockCompraService = { create: jasmine.createSpy('create') };

// Mocks para el CartContext
const mockCart = {
    cart: [],
    total: 0,
    removeFromCart: jasmine.createSpy('removeFromCart'),
    clearCart: jasmine.createSpy('clearCart'),
    increaseQuantity: jasmine.createSpy('increaseQuantity'),
    decreaseQuantity: jasmine.createSpy('decreaseQuantity'),
};
const mockUser = { id: 100, name: 'Test User' };


// Mockeamos hooks y servicios para que el componente no use los reales
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
    // Usamos el AuthProvider real para que envuelva el test
    AuthProvider: ({ children }) => <div>{children}</div> // Mockeamos el Provider
}));
jest.mock('../../context/CartContext', () => ({
    useCart: jest.fn(),
}));


// Helper para renderizar la página con estados específicos
const renderCart = (authState = { user: null }, cartState = { cart: [], total: 0 }) => {
    // Configuramos useAuth y useCart antes de renderizar
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
        // Propiedades adicionales necesarias para el payload
        item: { id: 10 } 
    };
    const mockCartPopulated = { 
        cart: [mockItem], 
        total: 2000,
    };


    beforeEach(() => {
        // Limpiamos todos los spies y localStorage
        mockGenerarMensaje.calls.reset();
        mockCompraService.create.calls.reset();
        mockNavigate.calls.reset();
    });


    // --- A. ESTADOS INICIALES ---
    it('muestra mensaje "carrito vacío" cuando cart.length es 0', () => {
        renderCart();
        expect(screen.getByText('Tu carrito está vacío. 🛒')).toBeTruthy();
    });

    it('renderiza la tabla y el total cuando hay productos', () => {
        renderCart({ user: mockUser }, mockCartPopulated);
        
        // Verifica el nombre del producto
        expect(screen.getByText('Perfume Test')).toBeTruthy();
        
        // Verifica el total
        expect(screen.getByText('$2,000')).toBeTruthy();
        
        // Verifica el botón de Checkout
        expect(screen.getByRole('button', { name: /Finalizar Compra/i })).toBeTruthy();
    });


    // --- B. MANEJO DE CANTIDAD Y REMOCIÓN ---
    it('llama a removeFromCart y muestra mensaje al clickear Eliminar', () => {
        renderCart({ user: mockUser }, mockCartPopulated);
        
        // Buscamos el botón Eliminar (dentro de la tabla)
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


    // --- C. FLUJO DE CHECKOUT ---

    it('CHECKOUT: Si no hay usuario, navega a /login', async () => {
        renderCart({ user: null }, mockCartPopulated);
        
        fireEvent.click(screen.getByRole('button', { name: /Finalizar Compra/i }));
        
        // 1. Muestra advertencia
        expect(mockGenerarMensaje).toHaveBeenCalledWith("Debes iniciar sesión para finalizar la compra.", "warning");
        
        // 2. Navega
        expect(mockNavigate).toHaveBeenCalledWith('/login');
        
        // 3. NO llama a la API
        expect(mockCompraService.create).not.toHaveBeenCalled();
    });
    
    it('CHECKOUT EXITOSO: Llama a la API, vacía carrito y navega a /compras', async () => {
        // Configuramos la API para que devuelva éxito
        mockCompraService.create.and.returnValue(Promise.resolve({ id: 101 }));
        
        renderCart({ user: mockUser }, mockCartPopulated);

        fireEvent.click(screen.getByRole('button', { name: /Finalizar Compra/i }));
        
        // 1. Verificamos la llamada a la API
        await waitFor(() => {
            expect(mockCompraService.create).toHaveBeenCalled();
        });
        
        // 2. Verificamos el vaciado del carrito y mensajes
        expect(mockCart.clearCart).toHaveBeenCalled();
        expect(mockGenerarMensaje).toHaveBeenCalledWith("¡Compra realizada con éxito!", "success");

        // 3. Verifica la navegación final
        expect(mockNavigate).toHaveBeenCalledWith('/compras');
    });

    it('CHECKOUT FALLIDO: Muestra mensaje de error sin vaciar carrito', async () => {
        // Configuramos la API para que falle
        mockCompraService.create.and.returnValue(Promise.reject(new Error('BD Error')));
        
        renderCart({ user: mockUser }, mockCartPopulated);

        fireEvent.click(screen.getByRole('button', { name: /Finalizar Compra/i }));
        
        // Esperamos que la promesa termine
        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith(
                "Error al procesar la compra. Revisa que los IDs 1 (estados) existan en tu BD.", "error"
            );
        });

        // El carrito NO debe vaciarse
        expect(mockCart.clearCart).not.toHaveBeenCalled();
    });
});