import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
<<<<<<< HEAD
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
=======
import Login from '../../pages/auth/login';
import { AuthProvider } from '../../context/AuthContext';
import UsuarioService from '../../service/UsuarioService';
// Importamos Swal para espiarlo, ya que GenerarMensaje lo usa internamente
import Swal from 'sweetalert2';

describe('Pagina Login (Jasmine)', () => {

    beforeEach(() => {
        // Limpiamos localStorage antes de cada test
        localStorage.clear();
        // Limpiamos los espías anteriores
        jasmine.getEnv().allowRespy(true);
    });

    // --- 1. RENDERIZADO ---
    it('debería renderizar el título e inputs', () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthProvider>
        );
        // Ajusta el texto según lo que realmente diga tu botón en Login.jsx
        // Puede ser 'Iniciar Sesión', 'Ingresar', etc.
        expect(screen.getByRole('button')).toBeTruthy();
        expect(screen.getByPlaceholderText('Correo Electrónico')).toBeTruthy();
    });

    // --- 2. VALIDACIÓN (SIN API) ---
    it('debería mostrar advertencia si faltan campos y NO llamar a la API', async () => {
        // Espiamos el servicio. .and.returnValue evita que se ejecute el real
        const loginSpy = spyOn(UsuarioService, 'login').and.returnValue(Promise.resolve({}));
        // Espiamos la alerta (GenerarMensaje usa Swal.fire)
        const alertSpy = spyOn(Swal, 'fire');

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthProvider>
        );

        const submitButton = screen.getByRole('button');
        fireEvent.click(submitButton);

        await waitFor(() => {
            // Verificamos que Swal se llamó con el mensaje de advertencia
            expect(alertSpy).toHaveBeenCalledWith(jasmine.objectContaining({
                title: 'Completa todos los campos',
                icon: 'warning'
            }));
        });

        // Verificamos que NO se llamó al servicio
        expect(loginSpy).not.toHaveBeenCalled();
    });

    // --- 3. FLUJO EXITOSO ---
    it('debería llamar a la API y guardar sesión al ser exitoso', async () => {
        const mockUser = { id: 1, nombre: 'Juan', rol: { id: 3, nombre: 'Cliente' }, correo: 'test@test.com' };

        // Espiamos el servicio para que devuelva éxito
        const loginSpy = spyOn(UsuarioService, 'login').and.returnValue(Promise.resolve(mockUser));
        const alertSpy = spyOn(Swal, 'fire');

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthProvider>
        );

        // Llenamos el formulario
        fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'juan@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: '123456' } });

        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            // 1. Se llamó al servicio
            expect(loginSpy).toHaveBeenCalled();
            // 2. Se mostró mensaje de éxito
            expect(alertSpy).toHaveBeenCalledWith(jasmine.objectContaining({
                title: jasmine.stringMatching(/Bienvenido/i), // Busca la palabra 'Bienvenido'
                icon: 'success'
            }));
        });
    });

    // --- 4. FLUJO FALLIDO ---
    it('debería mostrar error si la API falla', async () => {
        // Espiamos el servicio para que falle
        const loginSpy = spyOn(UsuarioService, 'login').and.returnValue(Promise.reject(new Error('Login fallido')));
        const alertSpy = spyOn(Swal, 'fire');

        render(
            <AuthProvider>
                <MemoryRouter>
                    <Login />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'fail@test.com' } });
        fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: '123' } });

        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(loginSpy).toHaveBeenCalled();
            // Verificamos mensaje de error
            expect(alertSpy).toHaveBeenCalledWith(jasmine.objectContaining({
                icon: 'error'
            }));
>>>>>>> 730bb1f346451fec2f044267f92c7efd125e627e
        });
    });
});