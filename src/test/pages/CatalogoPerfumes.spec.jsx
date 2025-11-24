import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ⚠️ IMPORTANTE: Ajusta la ruta a tu componente CatalogoPerfumes.jsx
import CatalogoPerfumes from '../../pages/CatalogoPerfumes'; 

// --- MOCKS DE DEPENDENCIAS EXTERNAS ---
const mockNavigate = jasmine.createSpy('useNavigate');
const mockMarcaService = { getAll: jasmine.createSpy('getAllMarcas') };
const mockPerfumeService = { getAll: jasmine.createSpy('getAllPerfumes') };

// Datos de prueba (simulan la respuesta de la API)
const mockMarcas = [
    { id: 1, nombre: 'Marca A' },
    { id: 2, nombre: 'Marca B' }
];

const mockPerfumes = [
    { id: 101, nombre: 'Perfume X', marca: { id: 1, nombre: 'Marca A' }, precio: 50, stock: 10 },
    { id: 102, nombre: 'Perfume Y', marca: { id: 2, nombre: 'Marca B' }, precio: 60, stock: 5 },
    { id: 103, nombre: 'Perfume Z', marca: { id: 1, nombre: 'Marca A' }, precio: 70, stock: 20 },
];

// Mockeamos hooks y servicios para que el componente no use los reales
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));
jest.mock('../../service/MarcaService', () => mockMarcaService);
jest.mock('../../service/PerfumeService', () => mockPerfumeService);


const renderCatalogo = () => {
    return render(
        <MemoryRouter>
            <CatalogoPerfumes />
        </MemoryRouter>
    );
};


describe('Pagina CatalogoPerfumes (Administración)', () => {

    beforeEach(() => {
        // Configuramos las respuestas de las APIs para el useEffect inicial
        mockMarcaService.getAll.and.returnValue(Promise.resolve(mockMarcas));
        mockPerfumeService.getAll.and.returnValue(Promise.resolve(mockPerfumes));
        mockNavigate.calls.reset();
    });

    // --- 1. RENDERIZADO INICIAL Y CARGA DE DATOS ---
    it('debería cargar las marcas y perfumes al iniciar', async () => {
        renderCatalogo();

        // Verificamos que las APIs hayan sido llamadas
        expect(mockMarcaService.getAll).toHaveBeenCalled();
        expect(mockPerfumeService.getAll).toHaveBeenCalled();
        
        // Esperamos a que los datos se rendericen en la tabla
        await waitFor(() => {
            // Verifica que la marca exista en el select
            expect(screen.getByText('Marca A')).toBeTruthy();
            // Verifica que los perfumes se rendericen en la tabla (deberían ser 3)
            expect(screen.getByText('Perfume X')).toBeTruthy();
            expect(screen.getAllByRole('row').length).toBe(4); // 1 cabecera + 3 filas
        });
    });

    // --- 2. LÓGICA DE FILTRADO ---
    it('debería filtrar la tabla cuando se selecciona una marca', async () => {
        renderCatalogo();

        await waitFor(() => {
            // Aseguramos que la opción "Marca B" exista antes de interactuar
            expect(screen.getByText('Marca B')).toBeTruthy();
        });

        // 1. Buscamos el select por el label asociado
        const selectMarca = screen.getByLabelText('Filtrar por marca:');

        // 2. Simulamos la selección de 'Marca B' (que tiene id: 2)
        fireEvent.change(selectMarca, { target: { value: '2' } });

        // 3. Verificamos que solo quede 'Perfume Y' (de Marca B)
        await waitFor(() => {
            expect(screen.getByText('Perfume Y')).toBeTruthy();
            expect(screen.queryByText('Perfume X')).toBeNull(); // Perfume X no debe estar
            expect(screen.getAllByRole('row').length).toBe(2); // 1 cabecera + 1 fila
        });
    });

    // --- 3. NAVEGACIÓN ---
    it('debería navegar a la página de detalle al clickear "Ver Detalle"', async () => {
        renderCatalogo();

        await waitFor(() => {
            // Aseguramos que el botón exista
            expect(screen.getByText('Ver Detalle')).toBeTruthy();
        });

        // Buscamos el botón de la fila de 'Perfume X' (ID: 101)
        const botonDetalle = screen.getAllByRole('button', { name: 'Ver Detalle' })[0]; 
        fireEvent.click(botonDetalle);

        // Verificamos que useNavigate haya sido llamado con la ruta correcta
        expect(mockNavigate).toHaveBeenCalledWith('/producto/101');
    });
});