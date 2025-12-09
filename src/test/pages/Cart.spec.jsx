import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Cart from '../../pages/Cart'; 
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

// --- MOCKS ---
const mockNavigate = vi.fn();
const mockGenerarMensaje = vi.fn();
const mockCompraService = { create: vi.fn() };
const mockCartActions = {
    cart: [], total: 0, removeFromCart: vi.fn(), clearCart: vi.fn(), 
    increaseQuantity: vi.fn(), decreaseQuantity: vi.fn()
};

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return { ...actual, useNavigate: () => mockNavigate };
});
vi.mock('../../utils/GenerarMensaje', () => ({ generarMensaje: mockGenerarMensaje }));
vi.mock('../../service/CompraService', () => mockCompraService);
vi.mock('../../context/AuthContext', () => ({ useAuth: vi.fn(), AuthProvider: ({children}) => <div>{children}</div> }));
vi.mock('../../context/CartContext', () => ({ useCart: vi.fn() }));

const renderCart = (user = null, cartData = { cart: [], total: 0 }) => {
    useAuth.mockReturnValue({ user });
    useCart.mockReturnValue({ ...mockCartActions, ...cartData });
    return render(<MemoryRouter><Cart /></MemoryRouter>);
};

describe('Pagina Cart', () => {
    const item = { id: 10, name: 'Perfume', price: 1000, quantity: 1, item: { id: 10 } };
    beforeEach(() => { vi.clearAllMocks(); });

    it('muestra carrito vacío', () => {
        renderCart();
        expect(screen.getByText('Tu carrito está vacío. 🛒')).toBeInTheDocument();
    });

    it('renderiza productos', () => {
        renderCart({ id: 1 }, { cart: [item], total: 1000 });
        expect(screen.getByText('Perfume')).toBeInTheDocument();
        expect(screen.getByText('$1,000')).toBeInTheDocument();
    });

    it('CHECKOUT: redirige a login si no hay usuario', () => {
        renderCart(null, { cart: [item], total: 1000 });
        fireEvent.click(screen.getByRole('button', { name: /Finalizar Compra/i }));
        
        expect(mockNavigate).toHaveBeenCalledWith('/login');
        expect(mockCompraService.create).not.toHaveBeenCalled();
    });

    it('CHECKOUT EXITOSO: crea compra y limpia carrito', async () => {
        mockCompraService.create.mockResolvedValue({ id: 101 });
        renderCart({ id: 1 }, { cart: [item], total: 1000 });

        fireEvent.click(screen.getByRole('button', { name: /Finalizar Compra/i }));
        
        await waitFor(() => { expect(mockCompraService.create).toHaveBeenCalled(); });
        expect(mockCartActions.clearCart).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/compras');
    });
});