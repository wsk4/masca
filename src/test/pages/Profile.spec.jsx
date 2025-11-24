import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../../pages/user/Profile';

// 1. MOCK DE DEPENDENCIAS CRÍTICAS
// Se mockean los servicios y hooks para controlar el comportamiento asíncrono
const mockNavigate = jasmine.createSpy('navigate');
const mockLogout = jasmine.createSpy('logout');
const mockLogin = jasmine.createSpy('login');
const mockGetById = jasmine.createSpy('getById');
const mockPatch = jasmine.createSpy('patch');
const mockGetAllDirecciones = jasmine.createSpy('getAllDirecciones');

// Datos de prueba consistentes con la estructura de la API
const mockUserData = {
    id: 101,
    nombre: "Administrador Test",
    correo: "admin@masca.com",
    telefono: "912345678",
    rol: { id: 1, nombre: "ADMIN" },
    direccion: { id: 5, calle: "Av. Falsa", numero: "123" }
};
const mockAddressData = [
    { id: 5, calle: "Av. Falsa", numero: "123", comuna: { nombre: "Santiago" } },
    { id: 6, calle: "Av. Real", numero: "456", comuna: { nombre: "Providencia" } }
];


// --- Configuración de Mocks ---

// Mockeamos useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

// Mockeamos useAuth
jest.mock('../../context/AuthContext', () => ({
    useAuth: (user) => ({
        user: mockUserData, // Estado por defecto: logueado
        login: mockLogin,
        logout: mockLogout,
    }),
}));

// Mockeamos los servicios
jest.mock('../../service/UsuarioService', () => ({
    getById: mockGetById,
    patch: mockPatch,
}));

jest.mock('../../service/DireccionService', () => ({
    getAll: mockGetAllDirecciones,
}));


describe('Profile Component', () => {

    beforeEach(() => {
        // Resetear mocks antes de cada prueba
        mockNavigate.calls.reset();
        mockLogout.calls.reset();
        mockLogin.calls.reset();
        
        // Simular respuestas exitosas por defecto
        mockGetById.and.returnValue(Promise.resolve(mockUserData));
        mockGetAllDirecciones.and.returnValue(Promise.resolve(mockAddressData));
        mockPatch.and.callFake((id, data) => Promise.resolve({ ...mockUserData, ...data }));

        // Simular window.alert y generarMensaje para evitar fallos de ambiente
        spyOn(window, 'alert');
        spyOn(window, 'generarMensaje'); 
    });
    
    // --- Test 1: Acceso Denegado ---
    it('debería mostrar mensaje de Acceso Restringido si no hay usuario', () => {
        // Sobrescribir mock para simular NO LOGUEADO
        jest.spyOn(require('../../context/AuthContext'), 'useAuth').mockReturnValue({ user: null, logout: mockLogout });
        
        render(<MemoryRouter><Profile /></MemoryRouter>);
        
        expect(screen.getByText(/Acceso Restringido/i)).toBeTruthy();
        expect(screen.getByText(/Por favor inicia sesión para ver tu perfil/i)).toBeTruthy();
    });

    // --- Test 2: Carga de Datos y Visualización ---
    it('debería cargar y mostrar la información del perfil del usuario', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);

        // Esperar a que el estado de 'loading' termine y los datos se muestren
        await waitFor(() => {
            // Verificar elementos del Header
            expect(screen.getByText(mockUserData.nombre)).toBeTruthy();
            expect(screen.getByText(mockUserData.rol.nombre.toUpperCase())).toBeTruthy();

            // Verificar detalles (uso de datos mock)
            expect(screen.getByText(mockUserData.correo)).toBeTruthy();
            expect(screen.getByText(`#${mockUserData.id}`)).toBeTruthy();
            expect(screen.getByText(mockUserData.telefono)).toBeTruthy();
            expect(screen.getByText(/Av. Falsa #123/i)).toBeTruthy();
            
            // Verificar que los servicios fueron llamados
            expect(mockGetById).toHaveBeenCalledWith(mockUserData.id);
            expect(mockGetAllDirecciones).toHaveBeenCalledTimes(1);
        }, { timeout: 1500 });
    });

    // --- Test 3: Interacciones del Footer ---
    it('debería llamar a handleLogout y navegar a /login al presionar Cerrar Sesión', () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        
        const logoutButton = screen.getByText(/Cerrar Sesión/i);
        fireEvent.click(logoutButton);
        
        expect(mockLogout).toHaveBeenCalledTimes(1);
        // Aunque mockNavigate no es llamado directamente por logout(), se espera que el componente lo haga:
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it('debería abrir el CreateModal al presionar Editar Información', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        
        // Esperamos que la carga termine para asegurar que el botón esté visible
        await waitFor(() => {
            expect(screen.getByText(/Correo Electrónico/i)).toBeTruthy();
        });

        const editButton = screen.getByText(/Editar Información/i);
        fireEvent.click(editButton);
        
        // Verificar que el modal se abre
        await waitFor(() => {
            expect(screen.getByText('Guardar Cambios')).toBeTruthy(); // Un elemento único del modal
            expect(screen.getByText('Editar Perfil')).toBeTruthy();
        });
    });
});