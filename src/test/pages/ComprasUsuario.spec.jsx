import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ComprasUsuario from '../../pages/ComprasUsuario'; 

const mockUseAuth = jest.fn();
const mockCompraService = { getAll: jasmine.createSpy('getAllCompras') };

jest.mock('../../context/AuthContext', () => ({
    useAuth: () => mockUseAuth(),
}));
jest.mock('../../service/CompraService', () => mockCompraService);


const mockUser = { id: 101, name: 'Usuario Compra' };

const mockAllCompras = [
    { id: 1, usuario: { id: 101 }, total: 5000, estado: { nombre: 'Pagado' }, direccion: { nombre: 'Direccion A' } }, // Compra del usuario
    { id: 2, usuario: { id: 202 }, total: 1000, estado: { nombre: 'Pendiente' }, direccion: { nombre: 'Direccion B' } }, // Compra de otro usuario
    { id: 3, usuario: { id: 101 }, total: 8000, estado: { nombre: 'Enviado' }, direccion: { nombre: 'Direccion A' } },  // Compra del usuario
];

const setupMocks = (user = mockUser, apiResponse = mockAllCompras) => {
    mockUseAuth.mockReturnValue({ user: user });
    mockCompraService.getAll.and.returnValue(Promise.resolve(apiResponse));
};

const renderComprasUsuario = (user = mockUser) => {
    setupMocks(user);
    return render(
        <MemoryRouter>
            <ComprasUsuario />
        </MemoryRouter>
    );
};


describe('Pagina ComprasUsuario', () => {

    it('muestra mensaje de acceso restringido si no hay usuario', () => {
        setupMocks(null); 
        renderComprasUsuario(null); 
        
        expect(screen.getByText('Acceso restringido.')).toBeTruthy();
        
        expect(mockCompraService.getAll).not.toHaveBeenCalled();
    });

    it('Llama a la API, filtra correctamente las compras por ID y renderiza la tabla', async () => {
        setupMocks(mockUser, mockAllCompras); 
        
        renderComprasUsuario(mockUser); 

        expect(mockCompraService.getAll).toHaveBeenCalled();

        await waitFor(() => {
            expect(screen.getByText('5000')).toBeTruthy();
            expect(screen.getByText('Pagado')).toBeTruthy();
            
            expect(screen.getByText('8000')).toBeTruthy();
            expect(screen.getByText('Enviado')).toBeTruthy();
            
            expect(screen.queryByText('1000')).toBeNull();
            
            expect(screen.getAllByRole('row').length).toBe(3); 
        });
    });
    
    it('Muestra una tabla vacía si el usuario no tiene compras', async () => {
        setupMocks(mockUser, mockAllCompras.filter(c => c.id === 2)); 
        
        renderComprasUsuario(mockUser);
        
        await waitFor(() => {
            expect(screen.getAllByRole('row').length).toBe(1);
        });
    });

});