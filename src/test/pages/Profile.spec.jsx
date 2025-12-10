import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../../pages/user/Profile';


const mockNavigate = jasmine.createSpy('navigate');
const mockLogout = jasmine.createSpy('logout');
const mockLogin = jasmine.createSpy('login');
const mockGetById = jasmine.createSpy('getById');
const mockPatch = jasmine.createSpy('patch');
const mockGetAllDirecciones = jasmine.createSpy('getAllDirecciones');


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





jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));


jest.mock('../../context/AuthContext', () => ({
    useAuth: (user) => ({
        user: mockUserData, 
        login: mockLogin,
        logout: mockLogout,
    }),
}));


jest.mock('../../service/UsuarioService', () => ({
    getById: mockGetById,
    patch: mockPatch,
}));

jest.mock('../../service/DireccionService', () => ({
    getAll: mockGetAllDirecciones,
}));


describe('Profile Component', () => {

    beforeEach(() => {
        
        mockNavigate.calls.reset();
        mockLogout.calls.reset();
        mockLogin.calls.reset();
        mockGetById.and.returnValue(Promise.resolve(mockUserData));
        mockGetAllDirecciones.and.returnValue(Promise.resolve(mockAddressData));
        mockPatch.and.callFake((id, data) => Promise.resolve({ ...mockUserData, ...data }));

        
        spyOn(window, 'alert');
        spyOn(window, 'generarMensaje'); 
    });
    
    it('debería mostrar mensaje de Acceso Restringido si no hay usuario', () => {
        
        jest.spyOn(require('../../context/AuthContext'), 'useAuth').mockReturnValue({ user: null, logout: mockLogout });
        
        render(<MemoryRouter><Profile /></MemoryRouter>);
        
        expect(screen.getByText(/Acceso Restringido/i)).toBeTruthy();
        expect(screen.getByText(/Por favor inicia sesión para ver tu perfil/i)).toBeTruthy();
    });

    
    it('debería cargar y mostrar la información del perfil del usuario', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);

        
        await waitFor(() => {
            
            expect(screen.getByText(mockUserData.nombre)).toBeTruthy();
            expect(screen.getByText(mockUserData.rol.nombre.toUpperCase())).toBeTruthy();
            expect(screen.getByText(mockUserData.correo)).toBeTruthy();
            expect(screen.getByText(`#${mockUserData.id}`)).toBeTruthy();
            expect(screen.getByText(mockUserData.telefono)).toBeTruthy();
            expect(screen.getByText(/Av. Falsa #123/i)).toBeTruthy();
            expect(mockGetById).toHaveBeenCalledWith(mockUserData.id);
            expect(mockGetAllDirecciones).toHaveBeenCalledTimes(1);
        }, { timeout: 1500 });
    });


    it('debería llamar a handleLogout y navegar a /login al presionar Cerrar Sesión', () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        
        const logoutButton = screen.getByText(/Cerrar Sesión/i);
        fireEvent.click(logoutButton);
        
        expect(mockLogout).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith("/login");
    });

    it('debería abrir el CreateModal al presionar Editar Información', async () => {
        render(<MemoryRouter><Profile /></MemoryRouter>);
        
        
        await waitFor(() => {
            expect(screen.getByText(/Correo Electrónico/i)).toBeTruthy();
        });

        const editButton = screen.getByText(/Editar Información/i);
        fireEvent.click(editButton);
        
        
        await waitFor(() => {
            expect(screen.getByText('Guardar Cambios')).toBeTruthy(); 
            expect(screen.getByText('Editar Perfil')).toBeTruthy();
        });
    });
});