import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image'; 

describe('Componente Image', () => {
    
    it('renderiza la imagen con src y alt obligatorios', () => {
        const srcPrueba = 'http://sitio.com/foto.jpg';
        const altPrueba = 'Descripción de la foto';

        render(<Image src={srcPrueba} alt={altPrueba} />);
        
        const imgElement = screen.getByRole('img');
        
        expect(imgElement).toBeTruthy();
        expect(imgElement.getAttribute('src')).toBe(srcPrueba);
        expect(imgElement.getAttribute('alt')).toBe(altPrueba);
    });

    it('aplica clases CSS personalizadas', () => {
        render(<Image src="test.png" alt="test" className="clase-borde clase-roja" />);
        
        const imgElement = screen.getByRole('img');
        
        expect(imgElement.className).toContain('clase-borde');
        expect(imgElement.className).toContain('clase-roja');
    });

    it('es accesible (se puede encontrar por su texto alternativo)', () => {
        render(<Image src="icon.png" alt="Icono Accesible" />);
        
        const imgElement = screen.getByAltText('Icono Accesible');
        
        expect(imgElement).toBeTruthy();
    });
});