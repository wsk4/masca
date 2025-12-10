import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

const TestComponent = () => {
    const { user, login, logout, loading } = useAuth();

    if (loading) return <div data-testid="loading">Cargando...</div>;

    return (
        <div>
            <div data-testid="user-name">{user ? user.name : 'No Logueado'}</div>
            <button onClick={() => login({ name: 'Usuario Test', email: 'test@mail.com' })}>
                Logearse
            </button>
            <button onClick={logout}>
                Deslogearse
            </button>
        </div>
    );
};

describe('Contexto AuthContext', () => {

    beforeEach(() => {
        localStorage.clear();
        
        spyOn(localStorage, 'setItem').and.callThrough();
        spyOn(localStorage, 'removeItem').and.callThrough();
        spyOn(localStorage, 'getItem').and.callThrough();
    });

    it('inicia sin usuario y carga finalizada (si localStorage está vacío)', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => expect(screen.queryByTestId('loading')).toBeNull());

        expect(screen.getByTestId('user-name').textContent).toBe('No Logueado');
    });

    it('recupera el usuario del localStorage al iniciar (persistencia)', async () => {
        const userGuardado = { name: 'Juan Pérez' };
        localStorage.setItem('user', JSON.stringify(userGuardado));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('user-name').textContent).toBe('Juan Pérez');
        });
        
        expect(localStorage.getItem).toHaveBeenCalledWith('user');
    });

    it('actualiza el estado y guarda en localStorage al hacer login', async () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        await waitFor(() => expect(screen.queryByTestId('loading')).toBeNull());

        const loginBtn = screen.getByText('Logearse');
        fireEvent.click(loginBtn);

        expect(screen.getByTestId('user-name').textContent).toBe('Usuario Test');

        expect(localStorage.setItem).toHaveBeenCalledWith('user', jasmine.stringMatching('Usuario Test'));
    });

    it('limpia el estado y el localStorage al hacer logout', async () => {
        localStorage.setItem('user', JSON.stringify({ name: 'Usuario Activo' }));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        await waitFor(() => expect(screen.getByTestId('user-name').textContent).toBe('Usuario Activo'));

        const logoutBtn = screen.getByText('Deslogearse');
        fireEvent.click(logoutBtn);

        expect(screen.getByTestId('user-name').textContent).toBe('No Logueado');

        expect(localStorage.removeItem).toHaveBeenCalledWith('user');
        expect(localStorage.getItem('user')).toBeNull();
    });
});