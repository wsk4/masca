// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import Input from '../../../components/atoms/Input';

describe('Componente Input', () => {
    
    it('renderiza un input de texto por defecto', () => {
        render(<Input placeholder="Escribe aquí" />);
        // Busca por el placeholder
        const input = screen.getByPlaceholderText('Escribe aquí');
        
        expect(input.tagName).toBe('INPUT');
        expect(input).toHaveAttribute('type', 'text');
    });

    it('renderiza un textarea cuando type es "textarea"', () => {
        render(<Input type="textarea" placeholder="Mensaje largo" />);
        const textarea = screen.getByPlaceholderText('Mensaje largo');
        
        expect(textarea.tagName).toBe('TEXTAREA');
        // Los textarea no tienen atributo type en HTML, pero sí la clase resize-none que agregaste
        expect(textarea).toHaveClass('resize-none');
    });

    it('maneja cambios de valor (onChange)', () => {
        const handleChange = vi.fn();
        render(<Input name="test" onChange={handleChange} />);
        
        const input = screen.getByRole('textbox'); // role textbox funciona para input text y textarea
        fireEvent.change(input, { target: { value: 'Nuevo valor' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('aplica estilos de deshabilitado', () => {
        render(<Input disabled />);
        const input = screen.getByRole('textbox');
        
        expect(input).toBeDisabled();
        expect(input).toHaveClass('disabled:opacity-50'); // Tailwind class check
    });
});