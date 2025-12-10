import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ⚠️ IMPORTANTE: Ajusta la ruta a donde esté tu componente Login.jsx
import Login from '../../pages/Login'; 
import { AuthProvider, useAuth } from '../../context/AuthContext';


// --- SPIES Y MOCKS DE DEPENDENCIAS EXTERNAS ---
// Usamos jasmine.createSpy para espiar funciones críticas

// Mock de useNavigate
const mockNavigate = jasmine.createSpy('useNavigate');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// Mock del servicio de API (UsuarioService.login)
const mockLoginAPI = jasmine.createSpy('loginAPI');
jest.mock('../../service/UsuarioService', () => ({
    login: mockLoginAPI,
}));

// Mock de la utilería de mensajes
const mockGenerarMensaje = jasmine.createSpy('generarMensaje');
jest.mock('../../utils/GenerarMensaje', () => ({
    generarMensaje: mockGenerarMensaje,
}));

// Mock del contexto de autenticación
const mockAuthLogin = jasmine.createSpy('authLogin');
jest.mock('../../context/AuthContext', () => ({
    useAuth: () => ({ login: mockAuthLogin }),
}));


// Datos de respuesta exitosa de la API
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

// Helper para renderizar la página dentro del AuthProvider mockeado
const renderLogin = () => {
    // Usamos el AuthProvider real, pero sus dependencias (useAuth, useNavigate) están mockeadas
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
        // Limpiamos localStorage y reiniciamos spies
        localStorage.clear();
        mockLoginAPI.calls.reset();
        mockGenerarMensaje.calls.reset();
        mockNavigate.calls.reset();
    });

    // --- 1. RENDERIZADO Y ESTADO ---
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

    // --- 2. VALIDACIÓN (SIN API) ---
    it('debería mostrar advertencia si faltan campos y NO llamar a la API', async () => {
        renderLogin();
        const submitButton = screen.getByRole('button', { name: /Iniciar Sesión/i });
        
        // Simular click sin llenar
        fireEvent.click(submitButton);

        // 1. Verifica el mensaje de advertencia (sincrónico)
        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith('Completa todos los campos', 'warning');
        });
        
        // 2. Verifica que la API no se haya llamado
        expect(mockLoginAPI).not.toHaveBeenCalled();
    });

    // --- 3. FLUJO EXITOSO (Cliente) ---
    it('debería iniciar sesión, guardar el usuario y navegar a / al ser Cliente', async () => {
        // Configuramos la API para devolver un cliente
        mockLoginAPI.and.returnValue(Promise.resolve(successResponse));
        renderLogin();

        // Llenamos y enviamos
        fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'user@user.com' } });
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        // 1. Esperamos que la llamada a la API termine
        await waitFor(() => {
            expect(mockLoginAPI).toHaveBeenCalled();
            // Verifica que el botón vuelva a su texto normal
            expect(screen.getByText('Iniciar Sesión')).toBeTruthy(); 
        });

        // 2. Verifica la llamada al contexto (login) con los datos limpios
        expect(mockAuthLogin).toHaveBeenCalledWith({ id: 1, nombre: 'Juan Pérez', rol: successResponse.rol });

        // 3. Verifica el mensaje de éxito
        expect(mockGenerarMensaje).toHaveBeenCalledWith('¡Bienvenido Juan Pérez!', 'success');
        
        // 4. Verifica la navegación (Cliente -> '/')
        expect(mockNavigate).toHaveBeenCalledWith('/'); 
    });
    
    // --- 4. FLUJO EXITOSO (Admin) ---
    it('debería navegar a /admin al ser Administrador (rol id 1 o 2)', async () => {
        // Configuramos la API para devolver un administrador
        mockLoginAPI.and.returnValue(Promise.resolve(adminResponse));
        renderLogin();

        fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'admin@admin.com' } });
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        await waitFor(() => {
            // Verifica que la navegación vaya a /admin
            expect(mockNavigate).toHaveBeenCalledWith('/admin'); 
        });
    });

    // --- 5. FLUJO FALLIDO ---
    it('debería mostrar error de credenciales si la API falla', async () => {
        // Configuramos la API para que falle
        mockLoginAPI.and.returnValue(Promise.reject(new Error('401 Unauthorized')));
        renderLogin();

        fireEvent.change(screen.getByPlaceholderText('Correo Electrónico'), { target: { value: 'fail@fail.com' } });
        fireEvent.click(screen.getByRole('button', { name: /Iniciar Sesión/i }));

        // Verificamos que se llame al mensaje de error
        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith('Credenciales inválidas o error de servidor', 'error');
        });

        // Verifica que el formulario se haya limpiado (aunque falla la API)
        expect(screen.getByPlaceholderText('Correo Electrónico').value).toBe('');
    });
});