import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// Subimos 3 niveles para salir de la carpeta de tests
import Button from '../../../components/atoms/Button';

describe('Componente Button', () => {

    it('renderiza el botón con el texto correcto', () => {
        render(<Button text="Ingresar" />);
        
        // Buscamos el botón por su texto
        const buttonElement = screen.getByText('Ingresar');
        
        // Jasmine: Verificamos que exista
        expect(buttonElement).toBeTruthy();
        // Jasmine: Verificamos que sea un botón HTML
        expect(buttonElement.tagName).toBe('BUTTON');
    });

    it('ejecuta la función onClick cuando se hace click', () => {
        // Jasmine: Usamos createSpy en lugar de jest.fn()
        const handleClick = jasmine.createSpy('handleClick');
        
        render(<Button text="Click Aquí" onClick={handleClick} />);
        
        const buttonElement = screen.getByText('Click Aquí');
        fireEvent.click(buttonElement);
        
        // Jasmine: Verificamos si fue llamada
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('aplica estado y estilos de deshabilitado correctamente', () => {
        render(<Button text="No Tocar" disabled={true} />);
        
        const buttonElement = screen.getByRole('button'); // Busca cualquier botón
        
        // Jasmine: Verificamos la propiedad nativa 'disabled'
        expect(buttonElement.disabled).toBe(true);
        
        // Jasmine: Verificamos clases CSS específicas de tu ternario (bg-theme-border, cursor-not-allowed)
        expect(buttonElement.className).toContain('cursor-not-allowed');
        expect(buttonElement.className).toContain('bg-theme-border');
        
        // Verificamos que NO tenga las clases del estado activo
        expect(buttonElement.className).not.toContain('bg-theme-accent');
    });

    it('añade clases CSS personalizadas pasadas por props', () => {
        render(<Button text="Estilo Extra" className="mi-clase-unica mt-5" />);
        
        const buttonElement = screen.getByRole('button');
        
        // Jasmine: Verificamos que contenga las clases nuevas
        expect(buttonElement.className).toContain('mi-clase-unica');
        expect(buttonElement.className).toContain('mt-5');
    });

    it('pasa otros atributos al elemento HTML (spread props)', () => {
        render(<Button text="Enviar" type="submit" id="btn-login" />);
        
        const buttonElement = screen.getByRole('button');
        
        // Jasmine: Verificamos atributos HTML estándar
        expect(buttonElement.getAttribute('type')).toBe('submit');
        expect(buttonElement.getAttribute('id')).toBe('btn-login');
    });
});