import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import Contacto from '../../pages/Contacto'; 

const mockGenerarMensaje = jasmine.createSpy('generarMensaje');

jest.mock('../../utils/GenerarMensaje', () => ({
    generarMensaje: mockGenerarMensaje,
}));


const renderContacto = () => {
    return render(
        <Contacto />
    );
};


describe('Pagina Contacto (Formulario)', () => {

    beforeEach(() => {
        mockGenerarMensaje.calls.reset();
    });

    it('debería renderizar el título y los inputs necesarios', () => {
        renderContacto();
        
        expect(screen.getByText('Contáctanos')).toBeTruthy();
        
        expect(screen.getByPlaceholderText('Nombre')).toBeTruthy();
        expect(screen.getByPlaceholderText('Correo')).toBeTruthy();
        expect(screen.getByPlaceholderText('Mensaje')).toBeTruthy();
        
        expect(screen.getByRole('button', { name: /Enviar mensaje/i })).toBeTruthy();
    });

    it('debería actualizar el estado del formulario al escribir', () => {
        renderContacto();
        const nombreInput = screen.getByPlaceholderText('Nombre');
        
        fireEvent.change(nombreInput, { target: { name: 'nombre', value: 'Ana Test' } });
        
        expect(nombreInput.value).toBe('Ana Test');
    });

    it('debería mostrar advertencia si se intenta enviar con campos vacíos', () => {
        renderContacto();
        
        const submitButton = screen.getByRole('button', { name: /Enviar mensaje/i });
        
        fireEvent.click(submitButton);

        expect(mockGenerarMensaje).toHaveBeenCalledWith('Completa todos los campos', 'warning');
        
        expect(mockGenerarMensaje).not.toHaveBeenCalledWith(jasmine.stringMatching(/Mensaje enviado/), 'success');
    });

    it('debería mostrar éxito y resetear el formulario si todos los campos están llenos', () => {
        renderContacto();

        const nombreInput = screen.getByPlaceholderText('Nombre');
        const correoInput = screen.getByPlaceholderText('Correo');
        const submitButton = screen.getByRole('button', { name: /Enviar mensaje/i });

        fireEvent.change(nombreInput, { target: { name: 'nombre', value: 'Juan' } });
        fireEvent.change(correoInput, { target: { name: 'correo', value: 'j@mail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Mensaje'), { target: { name: 'mensaje', value: 'Consulta.' } });
        
        fireEvent.click(submitButton);

        expect(mockGenerarMensaje).toHaveBeenCalledWith('Mensaje enviado!', 'success');
        
        expect(nombreInput.value).toBe('');
        expect(correoInput.value).toBe('');
    });
});