import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ListarUbicaciones from './ListarUbicaciones';
import DireccionService from '../../../service/DireccionService';
import { AuthContext } from '../../../context/AuthContext';

describe('ListarUbicaciones', () => {
    let container = null;
    const mockDirecciones = [
        { id: 1, calle: 'Calle Uno', numero: '100', comuna: { id: 1, nombre: 'Centro' } },
        { id: 2, calle: 'Calle Dos', numero: '200', comuna: { id: 2, nombre: 'Norte' } }
    ];

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        
        spyOn(DireccionService, 'getAll').and.returnValue(Promise.resolve(mockDirecciones));
        spyOn(DireccionService, 'delete').and.returnValue(Promise.resolve());
        spyOn(DireccionService, 'create').and.returnValue(Promise.resolve());
        spyOn(DireccionService, 'update').and.returnValue(Promise.resolve());
        spyOn(window, 'confirm').and.returnValue(true);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('debe mostrar mensaje de carga si no hay usuario autenticado', () => {
        const mockAuth = { user: null };

        act(() => {
            ReactDOM.render(
                <AuthContext.Provider value={mockAuth}>
                    <ListarUbicaciones />
                </AuthContext.Provider>,
                container
            );
        });

        expect(container.textContent).toContain('Cargando usuario...');
        expect(DireccionService.getAll).not.toHaveBeenCalled();
    });

    it('debe renderizar la lista de direcciones correctamente', async () => {
        const mockAuth = { user: { id: 1, nombre: 'Test User' } };

        await act(async () => {
            ReactDOM.render(
                <AuthContext.Provider value={mockAuth}>
                    <ListarUbicaciones />
                </AuthContext.Provider>,
                container
            );
        });

        expect(DireccionService.getAll).toHaveBeenCalled();
        expect(container.querySelector('h1').textContent).toContain('Gestión de Direcciones');
        expect(container.textContent).toContain('Calle Uno');
        expect(container.textContent).toContain('Calle Dos');
        expect(container.textContent).toContain('Centro');
    });

    it('debe eliminar una dirección tras confirmación', async () => {
        const mockAuth = { user: { id: 1 } };

        await act(async () => {
            ReactDOM.render(
                <AuthContext.Provider value={mockAuth}>
                    <ListarUbicaciones />
                </AuthContext.Provider>,
                container
            );
        });

        const buttons = Array.from(container.querySelectorAll('button'));
        const deleteBtn = buttons.find(b => b.textContent === 'Eliminar');

        await act(async () => {
            deleteBtn.click();
        });

        expect(window.confirm).toHaveBeenCalled();
        expect(DireccionService.delete).toHaveBeenCalledWith(1);
        expect(DireccionService.getAll).toHaveBeenCalledTimes(2);
    });

    it('debe abrir modal y crear una nueva dirección', async () => {
        const mockAuth = { user: { id: 1 } };

        await act(async () => {
            ReactDOM.render(
                <AuthContext.Provider value={mockAuth}>
                    <ListarUbicaciones />
                </AuthContext.Provider>,
                container
            );
        });

        const buttons = Array.from(container.querySelectorAll('button'));
        const createBtn = buttons.find(b => b.textContent === 'Crear dirección');

        act(() => {
            createBtn.click();
        });

        const modalSubmitBtn = container.querySelector('button[type="submit"]') || Array.from(container.querySelectorAll('button')).find(b => b.textContent === 'Guardar');

        await act(async () => {
            modalSubmitBtn.click();
        });

        expect(DireccionService.create).toHaveBeenCalled();
        expect(DireccionService.getAll).toHaveBeenCalledTimes(2);
    });

    it('debe abrir modal en modo edición y actualizar dirección', async () => {
        const mockAuth = { user: { id: 1 } };

        await act(async () => {
            ReactDOM.render(
                <AuthContext.Provider value={mockAuth}>
                    <ListarUbicaciones />
                </AuthContext.Provider>,
                container
            );
        });

        const buttons = Array.from(container.querySelectorAll('button'));
        const editBtn = buttons.find(b => b.textContent === 'Editar');

        act(() => {
            editBtn.click();
        });

        await act(async () => {
            await new Promise(r => setTimeout(r, 20));
        });

        const modalSubmitBtn = container.querySelector('button[type="submit"]') || Array.from(container.querySelectorAll('button')).find(b => b.textContent === 'Guardar');

        await act(async () => {
            modalSubmitBtn.click();
        });

        expect(DireccionService.update).toHaveBeenCalled();
        expect(DireccionService.update).toHaveBeenCalledWith(1, jasmine.anything());
        expect(DireccionService.getAll).toHaveBeenCalledTimes(2);
    });
});