import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ⚠️ IMPORTANTE: Ajusta la ruta a tu componente AdderssBook.jsx
import AdderssBook from '../../pages/AddressBook'; 

// --- 1. MOCKS DE DEPENDENCIAS EXTERNAS ---
// Usamos jest.mock asumiendo que tu setup (Babel/Webpack) lo mapea a Jasmine/Karma.

// Mocks de Hooks y Utilidades
const mockUseAuth = jest.fn();
const mockLogin = jasmine.createSpy('login');
const mockGenerarMensaje = jasmine.createSpy('generarMensaje');

// Mocks de Servicios
const mockRegionService = { getAll: jasmine.createSpy('getAll') };
const mockComunaService = { getAll: jasmine.createSpy('getAll') };
const mockUsuarioService = { getById: jasmine.createSpy('getById'), patch: jasmine.createSpy('patch') };
const mockDireccionService = { create: jasmine.createSpy('create'), update: jasmine.createSpy('update') };


// Simulación del mocking de módulos (Si esto falla, debes hacer los mocks en un setup file)
jest.mock('../../context/AuthContext', () => ({ useAuth: () => mockUseAuth() }));
jest.mock('../../utils/GenerarMensaje', () => ({ generarMensaje: mockGenerarMensaje }));
jest.mock('../../service/RegionService', () => mockRegionService);
jest.mock('../../service/ComunaService', () => mockComunaService);
jest.mock('../../service/UsuarioService', () => mockUsuarioService);
jest.mock('../../service/DireccionService', () => mockDireccionService);


// --- 2. DATOS DE PRUEBA (MOCK DATA) ---
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


// --- 3. HELPER Y CONFIGURACIÓN ---

// Configura las respuestas de las promesas de carga inicial
const setupInitialMocks = (userHasAddress = true) => {
    mockRegionService.getAll.and.returnValue(Promise.resolve(mockRegiones));
    mockComunaService.getAll.and.returnValue(Promise.resolve(mockComunas));
    
    // Simula si el usuario tiene o no dirección guardada
    mockUsuarioService.getById.and.returnValue(
        Promise.resolve(userHasAddress ? mockUserWithAddress : mockUser)
    );
};

// Renderiza el componente con el contexto de autenticación
const renderAddressBook = (isUserLoggedIn = true) => {
    mockUseAuth.mockReturnValue({ 
        user: isUserLoggedIn ? mockUser : null, 
        login: mockLogin, 
        loading: false // Asumimos que la autenticación inicial ya cargó
    });
    return render(
        <MemoryRouter>
            <AdderssBook />
        </MemoryRouter>
    );
};


describe('Componente AdderssBook (Mi Dirección de Envío)', () => {

    // --- A. ESTADOS DE CARGA INICIAL Y VISTAS ---

    it('Muestra el indicador de carga (Loading State)', () => {
        // Mockeamos useAuth para que retorne loading: true (simulando carga de autenticación)
        mockUseAuth.mockReturnValue({ user: null, login: mockLogin, loading: true });
        renderAddressBook(false); 
        
        // El componente principal debe mostrar el spinner/texto de carga
        expect(screen.getByText('Cargando información...')).toBeTruthy();
    });

    it('Muestra el mensaje "No tienes dirección asignada" si el usuario no tiene dirección', async () => {
        setupInitialMocks(false); // No tiene dirección

        const { rerender } = renderAddressBook(true);

        // Es necesario esperar la carga de datos API
        await waitFor(() => {
            expect(mockUsuarioService.getById).toHaveBeenCalled();
            expect(screen.getByText('No tienes dirección asignada')).toBeTruthy();
        });
        
        // Verifica que el botón de crear exista
        expect(screen.getByRole('button', { name: /Agregar Dirección/i })).toBeTruthy();
    });

    it('Muestra la dirección actual si el usuario ya la tiene asignada', async () => {
        setupInitialMocks(true); // Tiene dirección

        renderAddressBook(true);

        // Esperamos a que el render finalice tras la llamada a la API
        await waitFor(() => {
            expect(screen.getByText(/Calle Falsa #123/i)).toBeTruthy();
        });
        
        // Verifica que el botón de editar exista
        expect(screen.getByRole('button', { name: /Editar/i })).toBeTruthy();
    });

    // --- B. LÓGICA DE APERTURA DE MODAL ---

    it('Abre el modal en modo "Crear" al hacer click en Agregar/Cambiar', async () => {
        setupInitialMocks(true); 
        renderAddressBook(true);
        await waitFor(() => {}); // Esperamos que cargue la vista principal

        // Click en el botón "Cambiar" (visible cuando ya hay dirección)
        fireEvent.click(screen.getByRole('button', { name: /Cambiar/i }));
        
        // Verifica que el modal se abrió y el título es de Creación
        expect(screen.getByText('Nueva Dirección')).toBeTruthy();
        
        // Verificamos que el formulario de la comuna muestre un valor vacío (para seleccionar)
        expect(screen.getByPlaceholderText('Selecciona tu Comuna...')).toBeTruthy();
    });

    it('Abre el modal en modo "Editar" con los datos de la dirección actual', async () => {
        setupInitialMocks(true); 
        renderAddressBook(true);
        await waitFor(() => {}); 

        // Click en el botón "Editar"
        fireEvent.click(screen.getByRole('button', { name: /Editar/i }));
        
        // Verifica el título
        expect(screen.getByText('Editar Dirección')).toBeTruthy();
        
        // Verificamos que los inputs estén precargados (el valor del input lo trae currentData)
        const calleInput = screen.getByPlaceholderText('Ej: Av. Providencia');
        expect(calleInput.value).toBe('Calle Falsa'); 
    });
    
    // --- C. LÓGICA DE SUBMISSION ---

    it('ESCENARIO CREAR: Llama a create, luego a patch (usuario), y muestra éxito', async () => {
        setupInitialMocks(false); // No tiene dirección

        // Configurar promesas de submit
        mockDireccionService.create.and.returnValue(Promise.resolve(mockNewAddressResponse));
        mockUsuarioService.patch.and.returnValue(Promise.resolve(mockUserWithAddress));
        
        renderAddressBook(true);
        await waitFor(() => {}); 

        // 1. Abrimos modal
        fireEvent.click(screen.getByRole('button', { name: /Agregar Dirección/i }));
        
        // 2. Simulamos llenado del formulario (simplificado, solo probamos la acción)
        const submitButton = screen.getByRole('button', { name: /Guardar y Asignar/i });
        
        // NOTA: En un test real, harías fireEvent.change en cada input aquí.
        // Simulamos el submit
        fireEvent.click(submitButton);

        // 3. Esperamos la llamada a la API de Creación de Dirección
        await waitFor(() => {
            expect(mockDireccionService.create).toHaveBeenCalled();
        });
        
        // 4. Verificamos la segunda llamada a la API (Actualizar Usuario)
        await waitFor(() => {
             expect(mockUsuarioService.patch).toHaveBeenCalled();
        });

        // 5. Verifica el mensaje de éxito
        expect(mockGenerarMensaje).toHaveBeenCalledWith("Nueva dirección asignada correctamente", "success");
        
        // 6. El modal debe cerrarse (CreateModal ya no debe estar)
        expect(screen.queryByText('Nueva Dirección')).toBeNull();
    });
});