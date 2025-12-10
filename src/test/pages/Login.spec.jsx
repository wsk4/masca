import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Login from '../../pages/Login'; 
import { AuthProvider, useAuth } from '../../context/AuthContext';





const mockNavigate = jasmine.createSpy('useNavigate');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


const mockLoginAPI = jasmine.createSpy('loginAPI');
jest.mock('../../service/UsuarioService', () => ({
    login: mockLoginAPI,
}));

const mockGenerarMensaje = jasmine.createSpy('generarMensaje');
jest.mock('../../utils/GenerarMensaje', () => ({
    generarMensaje: mockGenerarMensaje,
}));

const mockAuthLogin = jasmine.createSpy('authLogin');
jest.mock('../../context/AuthContext', () => ({
    useAuth: () => ({ login: mockAuthLogin }),
}));


const successResponse = { 
    id: 1, 
    nombre: 'Juan Pérez', 
    rol: { id: 3, nombre: 'Cliente' } 
};
const adminResponse = { 
    id: 2, 
    nombre: 'Admin Boss', 
    rol: { id: 1, nombre: 'Admin' } 
};

const renderLogin = () => {
    return render(
        <AuthProvider>
            <MemoryRouter initialEntries={['/login']}>
                <Login />
            </MemoryRouter>
        </AuthProvider>
    );
};


describe('Pagina Login (Integración)', () => {

    beforeEach(() => {
        localStorage.clear();
        mockLoginAPI.calls.reset();
        mockGenerarMensaje.calls.reset();
        mockNavigate.calls.reset();
    });

    it('debería renderizar el título e inputs de correo/contraseña', () => {
        renderLogin();
        expect(screen.getByText('Iniciar Sesión')).toBeTruthy();
        expect(screen.getByPlaceholderText('Correo Electrónico')).toBeTruthy();
        expect(screen.getByPlaceholderText('Contraseña')).toBeTruthy();
    });

    it('debería actualizar los inputs al escribir (onChange)', () => {
        renderLogin();
        const emailInput = screen.getByPlaceholderText('Correo Electrónico');
        fireEvent.change(emailInput, { target: { value: 'test@mail.com' } });
        expect(emailInput.value).toBe('test@mail.com');
    });

    it('debería mostrar advertencia si faltan campos y NO llamar a la API', async () => {
        renderLogin();
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
        
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith('Completa todos los campos', 'warning');
        });
        
        expect(mockLoginAPI).not.toHaveBeenCalled();
    });

    it('debería iniciar sesión, guardar el usuario y navegar a / al ser Cliente', async () => {
        mockLoginAPI.and.returnValue(Promise.resolve(successResponse));
        renderLogin();

        fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'user@user.com' } });
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        await waitFor(() => {
            expect(mockLoginAPI).toHaveBeenCalled();
            expect(screen.getByText('Iniciar Sesión')).toBeTruthy(); 
        });

        expect(mockAuthLogin).toHaveBeenCalledWith({ id: 1, nombre: 'Juan Pérez', rol: successResponse.rol });

        expect(mockGenerarMensaje).toHaveBeenCalledWith('¡Bienvenido Juan Pérez!', 'success');
        
        expect(mockNavigate).toHaveBeenCalledWith('/'); 
    });
    
    it('debería navegar a /admin al ser Administrador (rol id 1 o 2)', async () => {
        mockLoginAPI.and.returnValue(Promise.resolve(adminResponse));
        renderLogin();

        fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'admin@admin.com' } });
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/admin'); 
        });
    });

    it('debería mostrar error de credenciales si la API falla', async () => {
        mockLoginAPI.and.returnValue(Promise.reject(new Error('401 Unauthorized')));
        renderLogin();

        fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'fail@fail.com' } });
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith('Credenciales inválidas o error de servidor', 'error');
        });

        expect(screen.getByPlaceholderText('Correo Electrónico').value).toBe('');
    });
});