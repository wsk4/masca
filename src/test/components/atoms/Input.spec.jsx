import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// Subimos 3 niveles para llegar al componente
import Input from '../../../components/atoms/Input';

describe('Componente Input', () => {

    it('renderiza un input de tipo texto por defecto', () => {
        render(<Input name="nombre" placeholder="Escribe aquí" />);
        
        // Buscamos por el placeholder
        const inputElement = screen.getByPlaceholderText('Escribe aquí');
        
        // Jasmine: Verificamos existencia
        expect(inputElement).toBeTruthy();
        // Jasmine: Verificamos etiqueta HTML
        expect(inputElement.tagName).toBe('INPUT');
        // Jasmine: Verificamos atributo type
        expect(inputElement.getAttribute('type')).toBe('text');
        expect(inputElement.getAttribute('name')).toBe('nombre');
    });

    it('renderiza un textarea cuando el prop type es "textarea"', () => {
        render(<Input type="textarea" placeholder="Mensaje largo" />);
        
        const textareaElement = screen.getByPlaceholderText('Mensaje largo');
        
        expect(textareaElement).toBeTruthy();
        expect(textareaElement.tagName).toBe('TEXTAREA');
        // Jasmine: Verificamos la clase específica del textarea
        expect(textareaElement.className).toContain('resize-none');
    });

    it('ejecuta onChange cuando el usuario escribe', () => {
        // Jasmine: Spy nativo
        const handleChange = jasmine.createSpy('handleChange');
        render(<Input onChange={handleChange} placeholder="Testing" />);
        
        const inputElement = screen.getByPlaceholderText('Testing');
        
        // Simulamos escritura
        fireEvent.change(inputElement, { target: { value: 'Nuevo Valor' } });
        
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('aplica correctamente el estado disabled', () => {
        render(<Input disabled={true} placeholder="Bloqueado" />);
        
        const inputElement = screen.getByPlaceholderText('Bloqueado');
        
        // Jasmine: Verificamos propiedad disabled del DOM
        expect(inputElement.disabled).toBe(true);
        // Jasmine: Verificamos estilos de deshabilitado
        expect(inputElement.className).toContain('disabled:opacity-50');
        expect(inputElement.className).toContain('disabled:cursor-not-allowed');
    });

    it('soporta otros tipos de input (ej. password)', () => {
        render(<Input type="password" placeholder="Clave" />);
        
        const inputElement = screen.getByPlaceholderText('Clave');
        expect(inputElement.getAttribute('type')).toBe('password');
    });

    it('combina clases CSS personalizadas con las base', () => {
        render(<Input className="bg-gray-200 margin-top" placeholder="Estilos" />);
        
        const inputElement = screen.getByPlaceholderText('Estilos');
        
        expect(inputElement.className).toContain('bg-gray-200');
        expect(inputElement.className).toContain('margin-top');
        // Debe mantener clases base importantes
        expect(inputElement.className).toContain('w-full');
    });
});