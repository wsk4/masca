import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';


import Orders from '../../pages/Orders'; 

const mockUseAuth = jest.fn();
const mockCompraService = { getAll: jasmine.createSpy('getAllCompras') };

jest.mock('../../context/AuthContext', () => ({ useAuth: () => mockUseAuth() }));
jest.mock('../../service/CompraService', () => mockCompraService);


const mockUser = { id: 101, name: 'Usuario Logueado' };

const mockAllCompras = [
    { id: 1, usuario: { id: 101 }, total: 5000, estadoCompra: { nombre: 'Pagado' }, usuario: { direccion: { calle: 'Calle Falsa' } } }, // MATCH
    { id: 2, usuario: { id: 202 }, total: 1000, estadoCompra: { nombre: 'Pendiente' }, usuario: { direccion: { calle: 'Calle Real' } } }, // NO MATCH (Otro usuario)
    { id: 3, usuario: { id: 101 }, total: 8000, estadoCompra: { nombre: 'Enviado' }, usuario: { direccion: { calle: 'Calle Falsa' } } },  // MATCH
];


const renderOrders = (user = mockUser, apiResponse = mockAllCompras) => {
    mockUseAuth.mockReturnValue({ user: user });
    mockCompraService.getAll.and.returnValue(Promise.resolve(apiResponse));
    
    return render(
        <MemoryRouter>
            <Orders />
        </MemoryRouter>
    );
};


describe('Pagina Orders (Mis Compras)', () => {

    it('Muestra "Acceso restringido" si el usuario no está logueado', () => {
        mockUseAuth.mockReturnValue({ user: null });
        renderOrders(null); 
        
        expect(screen.getByText('Acceso restringido.')).toBeTruthy();
        expect(mockCompraService.getAll).not.toHaveBeenCalled();
    });

    it('Llama a la API y filtra las compras para mostrar solo las del usuario logueado', async () => {
        renderOrders(mockUser); 

        expect(mockCompraService.getAll).toHaveBeenCalled();

        await waitFor(() => {
            expect(screen.getByText('5000')).toBeTruthy();
            
            expect(screen.queryByText('1000')).toBeNull();
            
            expect(screen.getAllByRole('row').length).toBe(3); 
        });
    });

    it('Muestra "Sin dirección registrada" si la dirección no está en los datos de compra', async () => {
        const comprasSinDir = [
            { id: 4, usuario: { id: 101 }, total: 10, estadoCompra: { nombre: 'X' } },
        ];
        
        renderOrders(mockUser, comprasSinDir);

        await waitFor(() => {
            expect(screen.getByText('Sin dirección registrada')).toBeTruthy();
        });
    });
});