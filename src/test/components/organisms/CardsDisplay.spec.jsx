import React from 'react';
import { render, screen } from '@testing-library/react';
// Ajusta la ruta si es necesario
import CardsDisplay from '../../../components/organisms/CardsDisplay';

describe('Organismo CardsDisplay', () => {

    // Datos de prueba (Mock Data) simulando la estructura compleja que espera tu componente
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

        // Verificamos que se rendericen los textos
        expect(screen.getByText('Titulo Tarjeta 1')).toBeTruthy();
        expect(screen.getByText('Solo Texto')).toBeTruthy();

        // Verificamos clases de Grid (grid-cols-1, md:grid-cols-3)
        // El primer div dentro del container es el wrapper con las clases
        const gridContainer = container.firstChild.firstChild;
        expect(gridContainer.className).toContain('grid');
        expect(gridContainer.className).toContain('grid-cols-1');
    });

    it('renderiza el contenido en modo Lista (isCardList=true)', () => {
        const { container } = render(<CardsDisplay content={mockContent} isCardList={true} />);

        // Verificamos clases de Lista (flex-col, gap-6)
        const listContainer = container.firstChild.firstChild;
        expect(listContainer.className).toContain('flex-col');
        expect(listContainer.className).not.toContain('grid-cols-3');

        // Verificamos que las tarjetas individuales tengan clase flex-row (para imagen a la izq)
        // Buscamos los divs que son hijos directos del contenedor
        const cards = listContainer.childNodes;
        expect(cards[0].className).toContain('flex-col'); // sm:flex-row
    });

    it('renderiza correctamente las imágenes', () => {
        render(<CardsDisplay content={mockContent} />);

        const img = screen.getByAltText('Imagen 1');
        expect(img).toBeTruthy();
        expect(img.getAttribute('src')).toBe('img1.jpg');
        
        // Verifica que aplica la clase personalizada pasada en el objeto
        expect(img.className).toContain('img-class');
    });

    it('aplica clases específicas a la imagen en modo Lista', () => {
        render(<CardsDisplay content={mockContent} isCardList={true} />);

        const img = screen.getByAltText('Imagen 1');
        
        // En modo lista, tu componente fuerza estas clases:
        expect(img.className).toContain('w-24');
        expect(img.className).toContain('h-24');
        expect(img.className).toContain('object-contain');
    });

    it('renderiza correctamente los textos dinámicos (DynamicTexts)', () => {
        render(<CardsDisplay content={mockContent} />);

        // Verificamos que el componente DynamicTexts haya hecho su trabajo
        // renderizando los elementos HTML correctos
        const title = screen.getByText('Titulo Tarjeta 1');
        expect(title.tagName).toBe('H3'); // Según el mock variant: 'h3'

        const desc = screen.getByText('Descripcion 1');
        expect(desc.tagName).toBe('P'); // Según el mock variant: 'p'
    });

    it('no explota si recibe contenido vacío', () => {
        const { container } = render(<CardsDisplay content={[]} />);
        // Debería renderizar el contenedor vacío pero sin errores
        expect(container.firstChild).toBeTruthy();
    });
});