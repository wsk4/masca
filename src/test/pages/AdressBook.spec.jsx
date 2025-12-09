import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AdressBook from '../../pages/AddressBook'; 



const mockUseAuth = jest.fn();
const mockLogin = jasmine.createSpy('login');
const mockGenerarMensaje = jasmine.createSpy('generarMensaje');

const mockRegionService = { getAll: jasmine.createSpy('getAll') };
const mockComunaService = { getAll: jasmine.createSpy('getAll') };
const mockUsuarioService = { getById: jasmine.createSpy('getById'), patch: jasmine.createSpy('patch') };
const mockDireccionService = { create: jasmine.createSpy('create'), update: jasmine.createSpy('update') };


jest.mock('../../context/AuthContext', () => ({ useAuth: () => mockUseAuth() }));
jest.mock('../../utils/GenerarMensaje', () => ({ generarMensaje: mockGenerarMensaje }));
jest.mock('../../service/RegionService', () => mockRegionService);
jest.mock('../../service/ComunaService', () => mockComunaService);
jest.mock('../../service/UsuarioService', () => mockUsuarioService);
jest.mock('../../service/DireccionService', () => mockDireccionService);


const mockUser = { id: 1, name: 'Test User', rol: { id: 3 } };

const mockRegiones = [
    { id: 1, nombre: 'Región Test' },
];
const mockComunas = [
    { id: 10, nombre: 'Comuna Test', region: { id: 1, nombre: 'Región Test' } },
];
const mockAddress = {
    id: 50,
    calle: 'Calle Falsa',
    numero: '123',
    comuna: mockComunas[0],
};
const mockUserWithAddress = { ...mockUser, direccion: mockAddress };

const mockNewAddressResponse = { id: 51, calle: 'Calle Nueva', numero: '456', comuna: mockComunas[0] };



const setupInitialMocks = (userHasAddress = true) => {
    mockRegionService.getAll.and.returnValue(Promise.resolve(mockRegiones));
    mockComunaService.getAll.and.returnValue(Promise.resolve(mockComunas));
    
    mockUsuarioService.getById.and.returnValue(
        Promise.resolve(userHasAddress ? mockUserWithAddress : mockUser)
    );
};

const renderAddressBook = (isUserLoggedIn = true) => {
    mockUseAuth.mockReturnValue({ 
        user: isUserLoggedIn ? mockUser : null, 
        login: mockLogin, 
        loading: false 
    });
    return render(
        <MemoryRouter>
            <AdderssBook />
        </MemoryRouter>
    );
};


describe('Componente AdderssBook (Mi Dirección de Envío)', () => {


    it('Muestra el indicador de carga (Loading State)', () => {
        mockUseAuth.mockReturnValue({ user: null, login: mockLogin, loading: true });
        renderAddressBook(false); 
        
        expect(screen.getByText('Cargando información...')).toBeTruthy();
    });

    it('Muestra el mensaje "No tienes dirección asignada" si el usuario no tiene dirección', async () => {
        setupInitialMocks(false); 
        const { rerender } = renderAddressBook(true);

        await waitFor(() => {
            expect(mockUsuarioService.getById).toHaveBeenCalled();
            expect(screen.getByText('No tienes dirección asignada')).toBeTruthy();
        });
        
        expect(screen.getByRole('button', { name: /Agregar Dirección/i })).toBeTruthy();
    });

    it('Muestra la dirección actual si el usuario ya la tiene asignada', async () => {
        setupInitialMocks(true); 

        renderAddressBook(true);

        await waitFor(() => {
            expect(screen.getByText(/Calle Falsa #123/i)).toBeTruthy();
        });
        
        expect(screen.getByRole('button', { name: /Editar/i })).toBeTruthy();
    });


    it('Abre el modal en modo "Crear" al hacer click en Agregar/Cambiar', async () => {
        setupInitialMocks(true); 
        renderAddressBook(true);
        await waitFor(() => {}); 

        fireEvent.click(screen.getByRole('button', { name: /Cambiar/i }));
        
        expect(screen.getByText('Nueva Dirección')).toBeTruthy();
        
        expect(screen.getByPlaceholderText('Selecciona tu Comuna...')).toBeTruthy();
    });

    it('Abre el modal en modo "Editar" con los datos de la dirección actual', async () => {
        setupInitialMocks(true); 
        renderAddressBook(true);
        await waitFor(() => {}); 

        fireEvent.click(screen.getByRole('button', { name: /Editar/i }));
        
        expect(screen.getByText('Editar Dirección')).toBeTruthy();
        
        const calleInput = screen.getByPlaceholderText('Ej: Av. Providencia');
        expect(calleInput.value).toBe('Calle Falsa'); 
    });
    

    it('ESCENARIO CREAR: Llama a create, luego a patch (usuario), y muestra éxito', async () => {
        setupInitialMocks(false); 
        mockDireccionService.create.and.returnValue(Promise.resolve(mockNewAddressResponse));
        mockUsuarioService.patch.and.returnValue(Promise.resolve(mockUserWithAddress));
        
        renderAddressBook(true);
        await waitFor(() => {}); 

        fireEvent.click(screen.getByRole('button', { name: /Agregar Dirección/i }));
        
        const submitButton = screen.getByRole('button', { name: /Guardar y Asignar/i });
        
        
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockDireccionService.create).toHaveBeenCalled();
        });
        
        await waitFor(() => {
             expect(mockUsuarioService.patch).toHaveBeenCalled();
        });

        expect(mockGenerarMensaje).toHaveBeenCalledWith("Nueva dirección asignada correctamente", "success");
        
        expect(screen.queryByText('Nueva Dirección')).toBeNull();
    });
});