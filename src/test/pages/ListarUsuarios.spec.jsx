import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import ListarUsuarios from './ListarUsuarios';
import UsuarioService from '../../../service/UsuarioService';
import { AuthContext } from '../../../context/AuthContext';

describe('ListarUsuarios', () => {
    let container = null;
    const mockUsers = [
        { id: 1, nombre: 'Admin Test', correo: 'admin@test.com', rol: { id: 1, nombre: 'Administrador' }, telefono: '111', direccion: { calle: 'Av Test', numero: 123 } },
        { id: 2, nombre: 'Cliente Test', correo: 'cliente@test.com', rol: { id: 2, nombre: 'Cliente' }, telefono: '222', direccion: null }
    ];

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        
        spyOn(UsuarioService, 'getAll').and.returnValue(Promise.resolve(mockUsers));
        spyOn(UsuarioService, 'delete').and.returnValue(Promise.resolve());
        spyOn(UsuarioService, 'createUser').and.returnValue(Promise.resolve());
        spyOn(UsuarioService, 'update').and.returnValue(Promise.resolve());
        spyOn(window, 'confirm').and.returnValue(true);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('debe mostrar mensaje de acceso denegado si el usuario no es admin o cliente', async () => {
        const mockAuth = { user: { id: 99, rol: { id: 3 } } };

        await act(async () => {
            ReactDOM.render(
                <AuthContext.Provider value={mockAuth}>
                    <ListarUsuarios />
                </AuthContext.Provider>,
                container
            );
        });

        expect(container.textContent).toContain('Acceso denegado');
        expect(UsuarioService.getAll).not.toHaveBeenCalled();
    });

    it('debe renderizar la tabla y cargar usuarios si tiene permisos', async () => {
        const mockAuth = { user: { id: 1, rol: { id: 1 } } };

        await act(async () => {
            ReactDOM.render(
                <AuthContext.Provider value={mockAuth}>
                    <ListarUsuarios />
                </AuthContext.Provider>,
                container
            );
        });

        expect(UsuarioService.getAll).toHaveBeenCalled();
        expect(container.querySelector('h1').textContent).toBe('Gestión de Usuarios');
        expect(container.textContent).toContain('Admin Test');
        expect(container.textContent).toContain('Cliente Test');
    });

    it('debe eliminar un usuario al confirmar', async () => {
        const mockAuth = { user: { id: 1, rol: { id: 1 } } };

        await act(async () => {
            ReactDOM.render(
                <AuthContext.Provider value={mockAuth}>
                    <ListarUsuarios />
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
        expect(UsuarioService.delete).toHaveBeenCalledWith(1);
        expect(UsuarioService.getAll).toHaveBeenCalledTimes(2);
    });

    it('debe abrir modal y crear usuario correctamente', async () => {
        const mockAuth = { user: { id: 1, rol: { id: 1 } } };

        await act(async () => {
            ReactDOM.render(
                <AuthContext.Provider value={mockAuth}>
                    <ListarUsuarios />
                </AuthContext.Provider>,
                container
            );
        });

        const buttons = Array.from(container.querySelectorAll('button'));
        const createBtn = buttons.find(b => b.textContent === 'Crear usuario');

        act(() => {
            createBtn.click();
        });

        const modalSubmitBtn = container.querySelector('button[type="submit"]') || Array.from(container.querySelectorAll('button')).find(b => b.textContent === 'Guardar');

        await act(async () => {
            modalSubmitBtn.click();
        });

        expect(UsuarioService.createUser).toHaveBeenCalled();
        expect(UsuarioService.getAll).toHaveBeenCalledTimes(2);
    });

    it('debe abrir modal en modo edicion y actualizar usuario', async () => {
        const mockAuth = { user: { id: 1, rol: { id: 1 } } };

        await act(async () => {
            ReactDOM.render(
                <AuthContext.Provider value={mockAuth}>
                    <ListarUsuarios />
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

        expect(UsuarioService.update).toHaveBeenCalled();
        expect(UsuarioService.update).toHaveBeenCalledWith(1, jasmine.anything());
        expect(UsuarioService.getAll).toHaveBeenCalledTimes(2);
    });
});