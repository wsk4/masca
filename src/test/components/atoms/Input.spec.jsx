import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../components/atoms/Input';

describe('Componente Input', () => {

    it('renderiza un input de tipo texto por defecto', () => {
        render(<Input name="nombre" placeholder="Escribe aquí" />);
        
        const inputElement = screen.getByPlaceholderText('Escribe aquí');
        
        expect(inputElement).toBeTruthy();
        expect(inputElement.tagName).toBe('INPUT');
        expect(inputElement.getAttribute('type')).toBe('text');
        expect(inputElement.getAttribute('name')).toBe('nombre');
    });

    it('renderiza un textarea cuando el prop type es "textarea"', () => {
        render(<Input type="textarea" placeholder="Mensaje largo" />);
        
        const textareaElement = screen.getByPlaceholderText('Mensaje largo');
        
        expect(textareaElement).toBeTruthy();
        expect(textareaElement.tagName).toBe('TEXTAREA');
        expect(textareaElement.className).toContain('resize-none');
    });

    it('ejecuta onChange cuando el usuario escribe', () => {
        const handleChange = jasmine.createSpy('handleChange');
        render(<Input onChange={handleChange} placeholder="Testing" />);
        
        const inputElement = screen.getByPlaceholderText('Testing');
        
        fireEvent.change(inputElement, { target: { value: 'Nuevo Valor' } });
        
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('aplica correctamente el estado disabled', () => {
        render(<Input disabled={true} placeholder="Bloqueado" />);
        
        const inputElement = screen.getByPlaceholderText('Bloqueado');
        
        expect(inputElement.disabled).toBe(true);
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
        expect(inputElement.className).toContain('w-full');
    });
});