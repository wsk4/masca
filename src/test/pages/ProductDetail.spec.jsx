import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetail from '../../pages/user/ProductDetail'; 


const mockGetById = jasmine.createSpy('getById');
jest.mock('../../service/PerfumeService', () => ({
    getById: mockGetById,
}));


const mockAddToCart = jasmine.createSpy('addToCart');
const mockUseCart = () => ({
    addToCart: mockAddToCart,
});
jest.mock('../../context/CartContext', () => ({
    useCart: mockUseCart,
}));



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

    it('debería mostrar el estado de carga y luego los detalles del producto', async () => {
        renderWithMocks({ route: `/producto/1`, perfumeData: mockPerfume });

        expect(screen.getByText(/Cargando detalle.../i)).toBeTruthy();

    
        await waitFor(() => {
            expect(screen.getByText(mockPerfume.nombre)).toBeTruthy();
            expect(screen.getByText(mockPerfume.descripcion)).toBeTruthy();
            
            
            expect(screen.getByText(/\$75\.000/i)).toBeTruthy();
            expect(screen.getByText(/Disponible/i)).toBeTruthy();
        });
        
        expect(mockGetById).toHaveBeenCalledWith('1');
    });

    it('debería deshabilitar el botón y mostrar "Agotado" si el stock es 0', async () => {
        renderWithMocks({ route: `/producto/2`, perfumeData: mockPerfumeAgotado });

        await waitFor(() => {
            expect(screen.getByText(/Agotado/i)).toBeTruthy();
        });

        const addButton = screen.getByText('Agregar al Carrito');
        expect(addButton).toBeDisabled();
    });

    it('debería llamar a addToCart con el objeto Perfume al hacer click', async () => {
        renderWithMocks({ route: `/producto/1`, perfumeData: mockPerfume });

        await waitFor(() => {
            expect(screen.getByText('Agregar al Carrito')).not.toBeDisabled();
        });

        const addButton = screen.getByText('Agregar al Carrito');
        fireEvent.click(addButton);

        expect(mockAddToCart).toHaveBeenCalledTimes(1);
        expect(mockAddToCart).toHaveBeenCalledWith(mockPerfume, 1);
    });

    it('debería mostrar el mensaje de carga si el servicio devuelve null', async () => {
        mockGetById.and.returnValue(new Promise(() => {})); 
        
        render(<MemoryRouter initialEntries={['/producto/999']}>
                <Routes><Route path="/producto/:id" element={<ProductDetail />} /></Routes>
               </MemoryRouter>);

        
        expect(screen.getByText(/Cargando detalle.../i)).toBeTruthy();
    });
});