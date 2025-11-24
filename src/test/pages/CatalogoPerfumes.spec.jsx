import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CatalogoPerfumes from '../../pages/CatalogoPerfumes'; 

const mockNavigate = jasmine.createSpy('useNavigate');
const mockMarcaService = { getAll: jasmine.createSpy('getAllMarcas') };
const mockPerfumeService = { getAll: jasmine.createSpy('getAllPerfumes') };

const mockMarcas = [
    { id: 1, nombre: 'Marca A' },
    { id: 2, nombre: 'Marca B' }
];

const mockPerfumes = [
    { id: 101, nombre: 'Perfume X', marca: { id: 1, nombre: 'Marca A' }, precio: 50, stock: 10 },
    { id: 102, nombre: 'Perfume Y', marca: { id: 2, nombre: 'Marca B' }, precio: 60, stock: 5 },
    { id: 103, nombre: 'Perfume Z', marca: { id: 1, nombre: 'Marca A' }, precio: 70, stock: 20 },
];

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
        mockMarcaService.getAll.and.returnValue(Promise.resolve(mockMarcas));
        mockPerfumeService.getAll.and.returnValue(Promise.resolve(mockPerfumes));
        mockNavigate.calls.reset();
    });

    it('debería cargar las marcas y perfumes al iniciar', async () => {
        renderCatalogo();

        expect(mockMarcaService.getAll).toHaveBeenCalled();
        expect(mockPerfumeService.getAll).toHaveBeenCalled();
        
        await waitFor(() => {
            expect(screen.getByText('Marca A')).toBeTruthy();
            expect(screen.getByText('Perfume X')).toBeTruthy();
            expect(screen.getAllByRole('row').length).toBe(4); 
        });
    });

    it('debería filtrar la tabla cuando se selecciona una marca', async () => {
        renderCatalogo();

        await waitFor(() => {
            expect(screen.getByText('Marca B')).toBeTruthy();
        });

        const selectMarca = screen.getByLabelText('Filtrar por marca:');

        fireEvent.change(selectMarca, { target: { value: '2' } });

        await waitFor(() => {
            expect(screen.getByText('Perfume Y')).toBeTruthy();
            expect(screen.queryByText('Perfume X')).toBeNull(); 
            expect(screen.getAllByRole('row').length).toBe(2); 
        });
    });

    it('debería navegar a la página de detalle al clickear "Ver Detalle"', async () => {
        renderCatalogo();

        await waitFor(() => {
            expect(screen.getByText('Ver Detalle')).toBeTruthy();
        });

        const botonDetalle = screen.getAllByRole('button', { name: 'Ver Detalle' })[0]; 
        fireEvent.click(botonDetalle);

        expect(mockNavigate).toHaveBeenCalledWith('/producto/101');
    });
});