import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ⚠️ IMPORTANTE: Ajusta esta ruta a tu componente Orders.jsx
import Orders from '../../pages/Orders'; 

// --- 1. SPIES Y MOCKS DE DEPENDENCIAS EXTERNAS ---
const mockUseAuth = jest.fn();
const mockCompraService = { getAll: jasmine.createSpy('getAllCompras') };

// Mockeamos el contexto y el servicio
jest.mock('../../context/AuthContext', () => ({ useAuth: () => mockUseAuth() }));
jest.mock('../../service/CompraService', () => mockCompraService);


// --- 2. DATOS DE PRUEBA (MOCK DATA) ---
const mockUser = { id: 101, name: 'Usuario Logueado' };

// Lista de compras que incluye compras propias y de terceros
const mockAllCompras = [
    { id: 1, usuario: { id: 101 }, total: 5000, estadoCompra: { nombre: 'Pagado' }, usuario: { direccion: { calle: 'Calle Falsa' } } }, // MATCH
    { id: 2, usuario: { id: 202 }, total: 1000, estadoCompra: { nombre: 'Pendiente' }, usuario: { direccion: { calle: 'Calle Real' } } }, // NO MATCH (Otro usuario)
    { id: 3, usuario: { id: 101 }, total: 8000, estadoCompra: { nombre: 'Enviado' }, usuario: { direccion: { calle: 'Calle Falsa' } } },  // MATCH
];


// Helper para configurar el estado de Auth y el render
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
        // Configuramos para simular que no hay usuario
        mockUseAuth.mockReturnValue({ user: null });
        renderOrders(null); 
        
        expect(screen.getByText('Acceso restringido.')).toBeTruthy();
        // Verifica que NO haya llamado al servicio, ya que user es null
        expect(mockCompraService.getAll).not.toHaveBeenCalled();
    });

    it('Llama a la API y filtra las compras para mostrar solo las del usuario logueado', async () => {
        renderOrders(mockUser); 

        // 1. Verificación de llamada al servicio
        expect(mockCompraService.getAll).toHaveBeenCalled();

        // 2. Esperamos a que los datos se rendericen en la tabla
        await waitFor(() => {
            // Verifica que la compra con total 5000 esté presente
            expect(screen.getByText('5000')).toBeTruthy();
            
            // Verifica que la compra del OTRO usuario (total 1000) NO esté presente
            expect(screen.queryByText('1000')).toBeNull();
            
            // Verificamos que se renderizaron las dos compras del usuario (2 filas + 1 cabecera)
            expect(screen.getAllByRole('row').length).toBe(3); 
        });
    });

    it('Muestra "Sin dirección registrada" si la dirección no está en los datos de compra', async () => {
        // Configuramos el mock para que devuelva una compra con usuario.direccion nulo o vacío
        const comprasSinDir = [
            { id: 4, usuario: { id: 101 }, total: 10, estadoCompra: { nombre: 'X' } },
        ];
        
        renderOrders(mockUser, comprasSinDir);

        await waitFor(() => {
            // Buscamos el texto por defecto de dirección (definido en el map del componente)
            expect(screen.getByText('Sin dirección registrada')).toBeTruthy();
        });
    });
});