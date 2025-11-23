import React from 'react';
import { render, screen } from '@testing-library/react';
// Ajusta la ruta según dónde tengas tu componente
import Image from '../../../components/atoms/Image'; 

describe('Componente Image', () => {
    
    it('renderiza la imagen con src y alt obligatorios', () => {
        const srcPrueba = 'http://sitio.com/foto.jpg';
        const altPrueba = 'Descripción de la foto';

        render(<Image src={srcPrueba} alt={altPrueba} />);
        
        // Buscamos la imagen por su rol
        const imgElement = screen.getByRole('img');
        
        // Jasmine: Validamos atributos usando DOM estándar
        expect(imgElement).toBeTruthy();
        expect(imgElement.getAttribute('src')).toBe(srcPrueba);
        expect(imgElement.getAttribute('alt')).toBe(altPrueba);
    });

    it('aplica clases CSS personalizadas', () => {
        render(<Image src="test.png" alt="test" className="clase-borde clase-roja" />);
        
        const imgElement = screen.getByRole('img');
        
        // Jasmine: Validamos que las clases estén en el className
        expect(imgElement.className).toContain('clase-borde');
        expect(imgElement.className).toContain('clase-roja');
    });

    it('es accesible (se puede encontrar por su texto alternativo)', () => {
        render(<Image src="icon.png" alt="Icono Accesible" />);
        
        // getByAltText es la prueba de fuego para accesibilidad de imágenes
        const imgElement = screen.getByAltText('Icono Accesible');
        
        expect(imgElement).toBeTruthy();
    });
});