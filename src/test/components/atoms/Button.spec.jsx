import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../../components/atoms/Button';

describe('Componente Button', () => {

    it('renderiza el botón con el texto correcto', () => {
        render(<Button text="Ingresar" />);
        
        const buttonElement = screen.getByText('Ingresar');
        
        expect(buttonElement).toBeTruthy();
        expect(buttonElement.tagName).toBe('BUTTON');
    });

    it('ejecuta la función onClick cuando se hace click', () => {
        const handleClick = jasmine.createSpy('handleClick');
        
        render(<Button text="Click Aquí" onClick={handleClick} />);
        
        const buttonElement = screen.getByText('Click Aquí');
        fireEvent.click(buttonElement);
        
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('aplica estado y estilos de deshabilitado correctamente', () => {
        render(<Button text="No Tocar" disabled={true} />);
        
        const buttonElement = screen.getByRole('button'); 
        
        expect(buttonElement.disabled).toBe(true);
        
        expect(buttonElement.className).toContain('cursor-not-allowed');
        expect(buttonElement.className).toContain('bg-theme-border');
        
        expect(buttonElement.className).not.toContain('bg-theme-accent');
    });

    it('añade clases CSS personalizadas pasadas por props', () => {
        render(<Button text="Estilo Extra" className="mi-clase-unica mt-5" />);
        
        const buttonElement = screen.getByRole('button');
        
        expect(buttonElement.className).toContain('mi-clase-unica');
        expect(buttonElement.className).toContain('mt-5');
    });

    it('pasa otros atributos al elemento HTML (spread props)', () => {
        render(<Button text="Enviar" type="submit" id="btn-login" />);
        
        const buttonElement = screen.getByRole('button');
        
        expect(buttonElement.getAttribute('type')).toBe('submit');
        expect(buttonElement.getAttribute('id')).toBe('btn-login');
    });
});