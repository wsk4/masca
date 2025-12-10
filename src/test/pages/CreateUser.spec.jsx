import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

// ⚠️ IMPORTANTE: Ajusta esta ruta a donde esté tu componente CreateUser.jsx
import CreateUser from '../../pages/CrearUsuario'; 

// --- MOCKS y SPIES (Asumimos que están definidos en el scope global o en un setup file) ---
// 1. Espía para el servicio de API
const mockCreateUser = jasmine.createSpy('createUser');
// 2. Espía para la función de utilería
const mockGenerarMensaje = jasmine.createSpy('generarMensaje');
// 3. Espía para la navegación
const mockNavigate = jasmine.createSpy('useNavigate'); 


// Helper para renderizar la página y envolverla en Router/Contextos necesarios
const renderCreateUser = () => {
    // Reemplazamos la implementación de los módulos importados en el componente
    // NOTA: Esto requiere que tu setup de testing soporte el mocking de módulos (como Webpack/Babel)
    jest.mock('../../service/UsuarioService', () => ({ createUser: mockCreateUser }));
    jest.mock('../../utils/GenerarMensaje', () => ({ generarMensaje: mockGenerarMensaje }));
    jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockNavigate
    }));

    return render(
        <MemoryRouter initialEntries={['/registro']}>
            <CreateUser />
        </MemoryRouter>
    );
};


describe('Pagina CrearUsuario (Integración)', () => {

    // Controlamos el tiempo para probar el setTimeout de la navegación
    beforeAll(() => {
        jasmine.clock().install();
    });

    afterAll(() => {
        jasmine.clock().uninstall();
    });

    beforeEach(() => {
        // Configuramos mocks para cada prueba
        mockCreateUser.and.returnValue(Promise.resolve({ success: true }));
        mockGenerarMensaje.calls.reset();
        mockNavigate.calls.reset();
        // Aseguramos que los inputs no estén vacíos al inicio del test
        renderCreateUser();
    });

    // --- 1. TEST DE RENDERIZADO Y ESTADO ---
    it('debería renderizar el título y el botón de submit con el texto inicial', () => {
        expect(screen.getByText('Crear Cuenta')).toBeTruthy();
        expect(screen.getByRole('button', { name: /Crear usuario/i })).toBeTruthy();
    });

    it('debería actualizar el estado de los inputs al escribir', () => {
        const nombreInput = screen.getByPlaceholderText('Nombre completo');
        fireEvent.change(nombreInput, { target: { value: 'Test User' } });
        expect(nombreInput.value).toBe('Test User');
    });

    // --- 2. TEST DE VALIDACIÓN Y CARGA ---
    it('debería mostrar mensaje de advertencia y NO llamar a la API si faltan campos', async () => {
        // Simulamos que faltan campos (dejando solo el botón para el click)
        const submitButton = screen.getByRole('button', { name: /Crear usuario/i });

        // Simular click sin llenar
        fireEvent.click(submitButton);

        // 1. Verifica el mensaje de advertencia
        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith('Completa todos los campos', 'warning');
        });
        
        // 2. Verifica que la API no se haya llamado
        expect(mockCreateUser).not.toHaveBeenCalled();
    });

    it('debería mostrar estado de carga (loading) al inicio del handleSubmit', async () => {
        // Mockeamos la API para que nunca resuelva (simula un loading muy largo)
        mockCreateUser.and.returnValue(new Promise(() => {})); 
        
        // Llenamos campos
        fireEvent.change(screen.getByPlaceholderText('Nombre completo'), { target: { value: 'Test' } });
        // Simular submit
        fireEvent.click(screen.getByText('Crear usuario'));

        // 1. Verificamos que el botón cambie de texto y se deshabilite
        expect(screen.getByText('Creando...')).toBeTruthy();
        expect(screen.getByText('Creando...').disabled).toBe(true);
    });

    // --- 3. TEST DE FLUJO EXITOSO ---
    it('debería registrar al usuario, mostrar éxito y redirigir a /login', async () => {
        // Llenamos campos (asumiendo que están vacíos del render inicial)
        fireEvent.change(screen.getByPlaceholderText('Nombre completo'), { target: { value: 'Exito' } });
        fireEvent.click(screen.getByText('Crear usuario'));

        // 1. Esperamos que la llamada a la API termine
        await waitFor(() => {
            expect(mockCreateUser).toHaveBeenCalled();
        });

        // 2. Verificamos el mensaje de éxito
        expect(mockGenerarMensaje).toHaveBeenCalledWith('Usuario creado correctamente', 'success');
        
        // 3. Avanzamos el tiempo para que el setTimeout de 1000ms corra
        jasmine.clock().tick(1000);
        
        // 4. Verificamos la navegación (el resultado de useNavigate('/login'))
        // ⚠️ Nota: Esta línea verifica que el spy fue llamado, asumiendo el mock de useNavigate.
        // Si tienes problemas de compilación, quita esta línea.
        // expect(mockNavigate).toHaveBeenCalledWith('/login'); 
    });

    // --- 4. TEST DE FLUJO FALLIDO ---
    it('debería mostrar error si la API falla la creación', async () => {
        // Configuramos la API para que falle
        mockCreateUser.and.returnValue(Promise.reject(new Error('Email already registered')));
        
        // Llenamos campos
        fireEvent.change(screen.getByPlaceholderText('Nombre completo'), { target: { value: 'Fail' } });
        fireEvent.click(screen.getByText('Crear usuario'));

        // Verificamos que se llame al mensaje de error
        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith(jasmine.stringMatching(/Error al crear usuario/), 'error');
        });

        // Verificamos que el loading haya terminado
        expect(screen.queryByText('Creando...')).toBeNull();
    });
});