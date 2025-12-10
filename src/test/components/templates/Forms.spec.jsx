import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Forms from '../../../components/templates/Forms';

describe('Template Forms', () => {

    it('renderiza el contenedor con la clase por defecto', () => {
        const { container } = render(<Forms />);
        expect(container.firstChild.className).toContain('p-4');
    });

    it('renderiza componentes de texto (DynamicTexts) cuando type es "text"', () => {
        const contentMock = [
            {
                type: 'text',
                text: [
                    { id: 1, content: 'Título del Formulario', variant: 'h2' },
                    { id: 2, content: 'Instrucciones', variant: 'p' }
                ]
            }
        ];

        render(<Forms content={contentMock} />);
        
        const titulo = screen.getByText('Título del Formulario');
        expect(titulo).toBeTruthy();
        expect(titulo.tagName).toBe('H2');

        expect(screen.getByText('Instrucciones')).toBeTruthy();
    });

    it('renderiza botones y maneja el evento onClick cuando type es "button"', () => {
        const handleClick = jasmine.createSpy('handleClick');
        const contentMock = [
            {
                type: 'button',
                text: 'Enviar Datos',
                className: 'btn-custom-class',
                onClick: handleClick,
                disabled: false
            }
        ];

        render(<Forms content={contentMock} />);
        
        const boton = screen.getByText('Enviar Datos');
        expect(boton).toBeTruthy();
        

        expect(boton.className).toContain('btn-custom-class');
        
        fireEvent.click(boton);
        expect(handleClick).toHaveBeenCalled();
    });

    it('renderiza inputs dinámicos cuando type es "inputs"', () => {
        const contentMock = [
            {
                type: 'inputs',
                inputs: [
                    { name: 'email', placeholder: 'Ingresa tu correo', type: 'email' }
                ],
                className: 'mb-4'
            }
        ];

        render(<Forms content={contentMock} />);
        
        const input = screen.getByPlaceholderText('Ingresa tu correo');
        expect(input).toBeTruthy();
        expect(input.getAttribute('type')).toBe('email');
    });

    it('renderiza una estructura compleja con múltiples tipos', () => {
        const contentMock = [
            { type: 'text', text: [{ id: 1, content: 'Login', variant: 'h1' }] },
            { type: 'inputs', inputs: [{ name: 'user', placeholder: 'Usuario' }] },
            { type: 'button', text: 'Ingresar' }
        ];

        render(<Forms content={contentMock} />);
        
        expect(screen.getByText('Login')).toBeTruthy();
        expect(screen.getByPlaceholderText('Usuario')).toBeTruthy();
        expect(screen.getByText('Ingresar')).toBeTruthy();
    });
});