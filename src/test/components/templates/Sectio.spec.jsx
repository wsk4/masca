import React from 'react';
import { render, screen } from '@testing-library/react';
import Section from '../../../components/templates/Section';

describe('Template Section', () => {

    it('renderiza el contenedor con la clase por defecto si no se provee una', () => {
        const { container } = render(<Section />);
        expect(container.firstChild.className).toContain('p-4');
    });

    it('renderiza contenido de Texto (DynamicTexts)', () => {
        const mockContent = [
            {
                type: 'text',
                text: [{ id: 1, content: 'Título de Sección', variant: 'h2' }]
            }
        ];

        render(<Section content={mockContent} />);
        
        const heading = screen.getByRole('heading', { name: 'Título de Sección' });
        expect(heading).toBeTruthy();
        expect(heading.tagName).toBe('H2');
    });

    it('renderiza contenido de Imagen (Image)', () => {
        const mockContent = [
            {
                type: 'image',
                src: 'banner.jpg',
                alt: 'Banner Principal',
                className: 'w-full'
            }
        ];

        render(<Section content={mockContent} />);
        
        const img = screen.getByAltText('Banner Principal');
        expect(img).toBeTruthy();
        expect(img.getAttribute('src')).toBe('banner.jpg');
        expect(img.className).toContain('w-full');
    });

    it('renderiza contenido de Tarjetas (CardsDisplay)', () => {
        const mockContent = [
            {
                type: 'cards',
                cards: [
                    {
                        card: [{ type: 'text', content: 'Tarjeta 1', variant: 'h3' }]
                    }
                ]
            }
        ];

        render(<Section content={mockContent} />);
        
        expect(screen.getByText('Tarjeta 1')).toBeTruthy();
        

    });

    it('renderiza contenido de Tabla (DynamicTable) con título opcional', () => {
        const mockContent = [
            {
                type: 'table',
                title: 'Tabla de Usuarios',
                columns: ['Nombre', 'Rol'],
                data: [{ Nombre: 'Admin', Rol: 'Superuser' }],
                className: 'margin-custom'
            }
        ];

        render(<Section content={mockContent} />);
        
        expect(screen.getByRole('heading', { name: 'Tabla de Usuarios' })).toBeTruthy();
        

        expect(screen.getByText('Nombre')).toBeTruthy();
        expect(screen.getByText('Admin')).toBeTruthy();
        

        const titulo = screen.getByText('Tabla de Usuarios');
        expect(titulo.parentNode.className).toContain('margin-custom');
    });
});