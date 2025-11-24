import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from '../../pages/user/ProductDetail'; 

// --- Mocks de Dependencias ---

// Mock de PerfumeService
const mockGetById = jasmine.createSpy('getById');
jest.mock('../../service/PerfumeService', () => ({
    getById: mockGetById,
}));

// Mock de useCart
const mockAddToCart = jasmine.createSpy('addToCart');
const mockUseCart = () => ({
    addToCart: mockAddToCart,
});
jest.mock('../../context/CartContext', () => ({
    useCart: mockUseCart,
}));


// Datos de Prueba
const mockPerfume = {
    id: 1,
    nombre: "Versace Eros",
    descripcion: "Una fragancia fresca y poderosa.",
    precio: 75000,
    stock: 10,
    url: "/img/eros.webp",
    marca: { nombre: "Versace" },
    categoria: { nombre: "Masculino" }
};
const mockPerfumeAgotado = {
    ...mockPerfume,
    id: 2,
    nombre: "Agotado Test",
    stock: 0,
};

// Función de renderizado con Router
function renderWithMocks({ route, perfumeData }) {
    mockGetById.and.returnValue(Promise.resolve(perfumeData));

    return render(
        <MemoryRouter initialEntries={[route]}>
            <Routes>
                <Route path="/producto/:id" element={<ProductDetail />} />
            </Routes>
        </MemoryRouter>
    );
}


describe('ProductDetail Page', () => {

    beforeEach(() => {
        mockAddToCart.calls.reset();
    });

    // --- Test 1: Carga y Visualización de Datos ---
    it('debería mostrar el estado de carga y luego los detalles del producto', async () => {
        renderWithMocks({ route: `/producto/1`, perfumeData: mockPerfume });

        // 1. Verificar estado de carga
        expect(screen.getByText(/Cargando detalle.../i)).toBeTruthy();

        // 2. Esperar a que los datos se carguen
        await waitFor(() => {
            expect(screen.getByText(mockPerfume.nombre)).toBeTruthy();
            expect(screen.getByText(mockPerfume.descripcion)).toBeTruthy();
            
            // Verificar precio y stock disponible
            expect(screen.getByText(/\$75\.000/i)).toBeTruthy();
            expect(screen.getByText(/Disponible/i)).toBeTruthy();
        });
        
        // Verificar que el servicio fue llamado con el ID correcto
        expect(mockGetById).toHaveBeenCalledWith('1');
    });

    // --- Test 2: Producto Agotado ---
    it('debería deshabilitar el botón y mostrar "Agotado" si el stock es 0', async () => {
        renderWithMocks({ route: `/producto/2`, perfumeData: mockPerfumeAgotado });

        await waitFor(() => {
            expect(screen.getByText(/Agotado/i)).toBeTruthy();
        });

        const addButton = screen.getByText('Agregar al Carrito');
        expect(addButton).toBeDisabled();
    });

    // --- Test 3: Funcionalidad Agregar al Carrito ---
    it('debería llamar a addToCart con el objeto Perfume al hacer click', async () => {
        renderWithMocks({ route: `/producto/1`, perfumeData: mockPerfume });

        await waitFor(() => {
            expect(screen.getByText('Agregar al Carrito')).not.toBeDisabled();
        });

        const addButton = screen.getByText('Agregar al Carrito');
        fireEvent.click(addButton);

        // Verificar que la función del contexto fue llamada
        expect(mockAddToCart).toHaveBeenCalledTimes(1);
        // Verificar que el payload enviado es el objeto completo del perfume
        expect(mockAddToCart).toHaveBeenCalledWith(mockPerfume, 1);
    });

    // --- Test 4: Producto no Encontrado (o error del servicio) ---
    it('debería mostrar el mensaje de carga si el servicio devuelve null', async () => {
        // Simular que el servicio tarda o falla (mantiene el estado de carga)
        mockGetById.and.returnValue(new Promise(() => {})); // Promesa pendiente
        
        render(<MemoryRouter initialEntries={['/producto/999']}>
                <Routes><Route path="/producto/:id" element={<ProductDetail />} /></Routes>
               </MemoryRouter>);

        // El mensaje de carga debe permanecer visible
        expect(screen.getByText(/Cargando detalle.../i)).toBeTruthy();
    });
});