import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Login from '../../pages/Login'; 
import { AuthProvider } from '../../context/AuthContext';

// --- MOCKS ---
const mockNavigate = vi.fn();
const mockLoginAPI = vi.fn();
const mockGenerarMensaje = vi.fn();
const mockAuthLogin = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return { ...actual, useNavigate: () => mockNavigate };
});
vi.mock('../../service/UsuarioService', () => ({ login: mockLoginAPI }));
vi.mock('../../utils/GenerarMensaje', () => ({ generarMensaje: mockGenerarMensaje }));
vi.mock('../../context/AuthContext', async () => {
    const actual = await vi.importActual('../../context/AuthContext');
    return { ...actual, useAuth: () => ({ login: mockAuthLogin }) };
});

const renderLogin = () => {
    return render(
        <AuthProvider>
            <MemoryRouter initialEntries={['/login']}><Login /></MemoryRouter>
        </AuthProvider>
    );
};

describe('Pagina Login', () => {
    beforeEach(() => { vi.clearAllMocks(); localStorage.clear(); });

    it('valida campos vacíos', async () => {
        renderLogin();
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith('Completa todos los campos', 'warning');
        });
        expect(mockLoginAPI).not.toHaveBeenCalled();
    });

    it('inicia sesión correctamente (Cliente)', async () => {
        mockLoginAPI.mockResolvedValue({ id: 1, nombre: 'Juan', rol: { id: 3 } }); // Simula éxito
        renderLogin();

        fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'test@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: '123' } });
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        await waitFor(() => {
            expect(mockLoginAPI).toHaveBeenCalled();
        });
        expect(mockGenerarMensaje).toHaveBeenCalledWith('¡Bienvenido Juan!', 'success');
        expect(mockNavigate).toHaveBeenCalledWith('/'); 
    });

    it('maneja error de API', async () => {
        mockLoginAPI.mockRejectedValue(new Error('401')); // Simula error
        renderLogin();

        fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'fail@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: '123' } });
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith('Credenciales inválidas o error de servidor', 'error');
        });
    });
});