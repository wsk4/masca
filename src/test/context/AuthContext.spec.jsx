import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// Ajusta la ruta si es necesario (asumiendo que el test está en src/test/context)
import { AuthProvider, useAuth } from '../../context/AuthContext';

// --- Componente Dummy para probar el consumo del contexto ---
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
        // Limpiamos localStorage antes de cada prueba para evitar contaminación
        localStorage.clear();
        
        // Espiamos los métodos de localStorage para verificar que se llamen
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

        // Esperamos a que el loading termine (useEffect inicial)
        await waitFor(() => expect(screen.queryByTestId('loading')).toBeNull());

        // Verificamos estado inicial
        expect(screen.getByTestId('user-name').textContent).toBe('No Logueado');
    });

    it('recupera el usuario del localStorage al iniciar (persistencia)', async () => {
        // Simulamos que ya había un usuario guardado
        const userGuardado = { name: 'Juan Pérez' };
        localStorage.setItem('user', JSON.stringify(userGuardado));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        // Al cargar, debería leer el localStorage y setear el usuario
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

        // Simulamos click en login
        const loginBtn = screen.getByText('Logearse');
        fireEvent.click(loginBtn);

        // Verificamos actualización en pantalla (estado)
        expect(screen.getByTestId('user-name').textContent).toBe('Usuario Test');

        // Verificamos persistencia
        expect(localStorage.setItem).toHaveBeenCalledWith('user', jasmine.stringMatching('Usuario Test'));
    });

    it('limpia el estado y el localStorage al hacer logout', async () => {
        // Iniciamos con sesión
        localStorage.setItem('user', JSON.stringify({ name: 'Usuario Activo' }));

        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );
        await waitFor(() => expect(screen.getByTestId('user-name').textContent).toBe('Usuario Activo'));

        // Simulamos click en logout
        const logoutBtn = screen.getByText('Deslogearse');
        fireEvent.click(logoutBtn);

        // Verificamos que volvió a estado nulo
        expect(screen.getByTestId('user-name').textContent).toBe('No Logueado');

        // Verificamos que se borró del storage
        expect(localStorage.removeItem).toHaveBeenCalledWith('user');
        expect(localStorage.getItem('user')).toBeNull();
    });
});