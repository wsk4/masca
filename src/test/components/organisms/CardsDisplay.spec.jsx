import React from 'react';
import { render, screen } from '@testing-library/react';
import CardsDisplay from '../../../components/organisms/CardsDisplay';

describe('Organismo CardsDisplay', () => {

    const mockContent = [
        {
            card: [
                { type: 'image', src: 'img1.jpg', alt: 'Imagen 1', className: 'img-class' },
                { type: 'text', content: 'Titulo Tarjeta 1', variant: 'h3' },
                { type: 'text', content: 'Descripcion 1', variant: 'p' }
            ]
        },
        {
            card: [
                { type: 'text', content: 'Solo Texto', variant: 'h2' }
            ]
        }
    ];

    it('renderiza el contenido en modo Grid (por defecto)', () => {
        const { container } = render(<CardsDisplay content={mockContent} />);

        expect(screen.getByText('Titulo Tarjeta 1')).toBeTruthy();
        expect(screen.getByText('Solo Texto')).toBeTruthy();

        const gridContainer = container.firstChild.firstChild;
        expect(gridContainer.className).toContain('grid');
        expect(gridContainer.className).toContain('grid-cols-1');
    });

    it('renderiza el contenido en modo Lista (isCardList=true)', () => {
        const { container } = render(<CardsDisplay content={mockContent} isCardList={true} />);

        const listContainer = container.firstChild.firstChild;
        expect(listContainer.className).toContain('flex-col');
        expect(listContainer.className).not.toContain('grid-cols-3');

        const cards = listContainer.childNodes;
        expect(cards[0].className).toContain('flex-col'); 
    });

    it('renderiza correctamente las imágenes', () => {
        render(<CardsDisplay content={mockContent} />);

        const img = screen.getByAltText('Imagen 1');
        expect(img).toBeTruthy();
        expect(img.getAttribute('src')).toBe('img1.jpg');
        
        expect(img.className).toContain('img-class');
    });

    it('aplica clases específicas a la imagen en modo Lista', () => {
        render(<CardsDisplay content={mockContent} isCardList={true} />);

        const img = screen.getByAltText('Imagen 1');
        
        expect(img.className).toContain('w-24');
        expect(img.className).toContain('h-24');
        expect(img.className).toContain('object-contain');
    });

    it('renderiza correctamente los textos dinámicos (DynamicTexts)', () => {
        render(<CardsDisplay content={mockContent} />);


        const title = screen.getByText('Titulo Tarjeta 1');
        expect(title.tagName).toBe('H3'); 

        const desc = screen.getByText('Descripcion 1');
        expect(desc.tagName).toBe('P'); 
    });

    it('no explota si recibe contenido vacío', () => {
        const { container } = render(<CardsDisplay content={[]} />);
        expect(container.firstChild).toBeTruthy();
    });
});