import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ⚠️ IMPORTANTE: Ajusta esta ruta a tu componente ComprasUsuario.jsx
import ComprasUsuario from '../../pages/ComprasUsuario'; 

// --- 1. SPIES Y MOCKS DE DEPENDENCIAS EXTERNAS ---
const mockUseAuth = jest.fn();
const mockCompraService = { getAll: jasmine.createSpy('getAllCompras') };

// Mockeamos hooks y servicios
jest.mock('../../context/AuthContext', () => ({
    useAuth: () => mockUseAuth(),
}));
jest.mock('../../service/CompraService', () => mockCompraService);


// --- 2. DATOS DE PRUEBA (MOCK DATA) ---
const mockUser = { id: 101, name: 'Usuario Compra' };

const mockAllCompras = [
    { id: 1, usuario: { id: 101 }, total: 5000, estado: { nombre: 'Pagado' }, direccion: { nombre: 'Direccion A' } }, // Compra del usuario
    { id: 2, usuario: { id: 202 }, total: 1000, estado: { nombre: 'Pendiente' }, direccion: { nombre: 'Direccion B' } }, // Compra de otro usuario
    { id: 3, usuario: { id: 101 }, total: 8000, estado: { nombre: 'Enviado' }, direccion: { nombre: 'Direccion A' } },  // Compra del usuario
];

// Helper para configurar el estado de Auth
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

    // --- A. ESTADO SIN AUTENTICACIÓN ---
    it('muestra mensaje de acceso restringido si no hay usuario', () => {
        setupMocks(null); 
        renderComprasUsuario(null); 
        
        expect(screen.getByText('Acceso restringido.')).toBeTruthy();
        
        // Verifica que NO haya llamado al servicio
        expect(mockCompraService.getAll).not.toHaveBeenCalled();
    });

    // --- B. ESTADO CON DATOS ---
    it('Llama a la API, filtra correctamente las compras por ID y renderiza la tabla', async () => {
        // Configuramos el mock para que devuelva todas las compras
        setupMocks(mockUser, mockAllCompras); 
        
        renderComprasUsuario(mockUser); 

        // 1. Verificamos la llamada a la API
        expect(mockCompraService.getAll).toHaveBeenCalled();

        // 2. Esperamos a que los datos se rendericen en la tabla
        await waitFor(() => {
            // Verifica que la compra del usuario (ID 1) esté presente
            expect(screen.getByText('5000')).toBeTruthy();
            expect(screen.getByText('Pagado')).toBeTruthy();
            
            // Verifica que la compra del usuario (ID 3) esté presente
            expect(screen.getByText('8000')).toBeTruthy();
            expect(screen.getByText('Enviado')).toBeTruthy();
            
            // Verifica que la compra del OTRO usuario (ID 2) NO esté presente
            expect(screen.queryByText('1000')).toBeNull();
            
            // Verifica el total de filas renderizadas (1 cabecera + 2 filas)
            expect(screen.getAllByRole('row').length).toBe(3); 
        });
    });
    
    // --- C. ESTADO SIN COMPRAS ---
    it('Muestra una tabla vacía si el usuario no tiene compras', async () => {
        // La API devuelve compras, pero ninguna coincide con el ID del usuario
        setupMocks(mockUser, mockAllCompras.filter(c => c.id === 2)); // Solo compra de otro ID
        
        renderComprasUsuario(mockUser);
        
        // Esperamos a que la tabla cargue
        await waitFor(() => {
            // Verifica que solo esté la cabecera (DynamicTable debe mostrar su emptyMessage si data es [])
            expect(screen.getAllByRole('row').length).toBe(1); // Solo la cabecera
        });
    });

});