import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import CreateUser from '../../pages/CrearUsuario'; 

const mockCreateUser = jasmine.createSpy('createUser');
const mockGenerarMensaje = jasmine.createSpy('generarMensaje');
const mockNavigate = jasmine.createSpy('useNavigate'); 


const renderCreateUser = () => {
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

    beforeAll(() => {
        jasmine.clock().install();
    });

    afterAll(() => {
        jasmine.clock().uninstall();
    });

    beforeEach(() => {
        mockCreateUser.and.returnValue(Promise.resolve({ success: true }));
        mockGenerarMensaje.calls.reset();
        mockNavigate.calls.reset();
        renderCreateUser();
    });

    it('debería renderizar el título y el botón de submit con el texto inicial', () => {
        expect(screen.getByText('Crear Cuenta')).toBeTruthy();
        expect(screen.getByRole('button', { name: /Crear usuario/i })).toBeTruthy();
    });

    it('debería actualizar el estado de los inputs al escribir', () => {
        const nombreInput = screen.getByPlaceholderText('Nombre completo');
        fireEvent.change(nombreInput, { target: { value: 'Test User' } });
        expect(nombreInput.value).toBe('Test User');
    });

    it('debería mostrar mensaje de advertencia y NO llamar a la API si faltan campos', async () => {
        const submitButton = screen.getByRole('button', { name: /Crear usuario/i });

        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith('Completa todos los campos', 'warning');
        });
        
        expect(mockCreateUser).not.toHaveBeenCalled();
    });

    it('debería mostrar estado de carga (loading) al inicio del handleSubmit', async () => {
        mockCreateUser.and.returnValue(new Promise(() => {})); 
        
        fireEvent.change(screen.getByPlaceholderText('Nombre completo'), { target: { value: 'Test' } });
        fireEvent.click(screen.getByText('Crear usuario'));

        expect(screen.getByText('Creando...')).toBeTruthy();
        expect(screen.getByText('Creando...').disabled).toBe(true);
    });

    it('debería registrar al usuario, mostrar éxito y redirigir a /login', async () => {
        fireEvent.change(screen.getByPlaceholderText('Nombre completo'), { target: { value: 'Exito' } });
        fireEvent.click(screen.getByText('Crear usuario'));

        await waitFor(() => {
            expect(mockCreateUser).toHaveBeenCalled();
        });

        expect(mockGenerarMensaje).toHaveBeenCalledWith('Usuario creado correctamente', 'success');
        
        jasmine.clock().tick(1000);
        
        
    });

    it('debería mostrar error si la API falla la creación', async () => {
        mockCreateUser.and.returnValue(Promise.reject(new Error('Email already registered')));
        
        fireEvent.change(screen.getByPlaceholderText('Nombre completo'), { target: { value: 'Fail' } });
        fireEvent.click(screen.getByText('Crear usuario'));

        await waitFor(() => {
            expect(mockGenerarMensaje).toHaveBeenCalledWith(jasmine.stringMatching(/Error al crear usuario/), 'error');
        });

        expect(screen.queryByText('Creando...')).toBeNull();
    });
});