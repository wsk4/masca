import React from 'react';
import { render, screen } from '@testing-library/react';
import DynamicTexts from '../../../components/molecules/DynamicTexts';

describe('Molecula DynamicTexts', () => {

    const mockTexts = [
        { id: 1, content: 'Soy un Título', variant: 'h1', className: 'titulo-grande' },
        { id: 2, content: 'Soy un párrafo', variant: 'p', className: 'texto-gris' },
        { id: 3, content: 'Soy un span', variant: 'span', className: 'texto-pequeno' }
    ];

    it('renderiza todos los textos proporcionados en el array', () => {
        render(<DynamicTexts Texts={mockTexts} />);

        expect(screen.getByText('Soy un Título')).toBeTruthy();
        expect(screen.getByText('Soy un párrafo')).toBeTruthy();
        expect(screen.getByText('Soy un span')).toBeTruthy();
    });

    it('aplica la variante (etiqueta HTML) correcta a cada elemento', () => {
        render(<DynamicTexts Texts={mockTexts} />);

        const h1 = screen.getByText('Soy un Título');
        expect(h1.tagName).toBe('H1');

        const p = screen.getByText('Soy un párrafo');
        expect(p.tagName).toBe('P');

        const span = screen.getByText('Soy un span');
        expect(span.tagName).toBe('SPAN');
    });

    it('aplica las clases CSS individuales correctamente', () => {
        render(<DynamicTexts Texts={mockTexts} />);

        const h1 = screen.getByText('Soy un Título');
        expect(h1.className).toContain('titulo-grande');

        const p = screen.getByText('Soy un párrafo');
        expect(p.className).toContain('texto-gris');
    });

    it('maneja arrays vacíos sin errores', () => {
        const { container } = render(<DynamicTexts Texts={[]} />);
        expect(container.innerHTML).toBe('');
    });
});