import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// ⚠️ IMPORTANTE: Ajusta esta ruta a donde esté tu componente Contacto.jsx
import Contacto from '../../pages/Contacto'; 

// --- MOCKS DE DEPENDENCIAS EXTERNAS ---
const mockGenerarMensaje = jasmine.createSpy('generarMensaje');

// Mockeamos la utilería de mensajes
jest.mock('../../utils/GenerarMensaje', () => ({
    generarMensaje: mockGenerarMensaje,
}));


const renderContacto = () => {
    // Usamos MemoryRouter solo por si hay algún componente interno que lo requiera
    return render(
        <Contacto />
    );
};


describe('Pagina Contacto (Formulario)', () => {

    beforeEach(() => {
        mockGenerarMensaje.calls.reset();
    });

    // --- 1. RENDERIZADO ---
    it('debería renderizar el título y los inputs necesarios', () => {
        renderContacto();
        
        // Verifica el título principal
        expect(screen.getByText('Contáctanos')).toBeTruthy();
        
        // Verifica los inputs (buscamos por placeholder)
        expect(screen.getByPlaceholderText('Nombre')).toBeTruthy();
        expect(screen.getByPlaceholderText('Correo')).toBeTruthy();
        expect(screen.getByPlaceholderText('Mensaje')).toBeTruthy();
        
        // Verifica el botón de submit
        expect(screen.getByRole('button', { name: /Enviar mensaje/i })).toBeTruthy();
    });

    // --- 2. MANEJO DE ESTADO ---
    it('debería actualizar el estado del formulario al escribir', () => {
        renderContacto();
        const nombreInput = screen.getByPlaceholderText('Nombre');
        
        fireEvent.change(nombreInput, { target: { name: 'nombre', value: 'Ana Test' } });
        
        expect(nombreInput.value).toBe('Ana Test');
    });

    // --- 3. VALIDACIÓN (FLUJO DE ERROR) ---
    it('debería mostrar advertencia si se intenta enviar con campos vacíos', () => {
        renderContacto();
        
        const submitButton = screen.getByRole('button', { name: /Enviar mensaje/i });
        
        // No llenamos inputs y hacemos click
        fireEvent.click(submitButton);

        // 1. Verifica el mensaje de advertencia
        expect(mockGenerarMensaje).toHaveBeenCalledWith('Completa todos los campos', 'warning');
        
        // 2. Verifica que el mensaje de éxito NO se haya llamado
        expect(mockGenerarMensaje).not.toHaveBeenCalledWith(jasmine.stringMatching(/Mensaje enviado/), 'success');
    });

    // --- 4. FLUJO EXITOSO ---
    it('debería mostrar éxito y resetear el formulario si todos los campos están llenos', () => {
        renderContacto();

        const nombreInput = screen.getByPlaceholderText('Nombre');
        const correoInput = screen.getByPlaceholderText('Correo');
        const submitButton = screen.getByRole('button', { name: /Enviar mensaje/i });

        // 1. Llenamos inputs
        fireEvent.change(nombreInput, { target: { name: 'nombre', value: 'Juan' } });
        fireEvent.change(correoInput, { target: { name: 'correo', value: 'j@mail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Mensaje'), { target: { name: 'mensaje', value: 'Consulta.' } });
        
        // 2. Enviamos
        fireEvent.click(submitButton);

        // 3. Verifica el mensaje de éxito
        expect(mockGenerarMensaje).toHaveBeenCalledWith('Mensaje enviado!', 'success');
        
        // 4. Verifica el reseteo del formulario (controlado por setForm({ nombre: "", correo: "", mensaje: "" }))
        expect(nombreInput.value).toBe('');
        expect(correoInput.value).toBe('');
    });
});