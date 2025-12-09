// Image.test.tsx
import { describe, it, expect, vi } from 'vitest'; // Importaciones de Vitest
import { render, screen, fireEvent } from '@testing-library/react';
import Image from '../../../components/atoms/Image'; 

describe('Componente Image (Vitest Suite)', () => {
    
    // --- HAPPY PATH (Camino Feliz) ---

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

    // --- EDGE CASES & INTERACTIVIDAD (Nuevos) ---

    it('propaga eventos de click (onClick)', () => {
        // Usamos vi.fn() en lugar de jest.fn()
        const handleClick = vi.fn();
        
        render(<Image src="btn.png" alt="botón" onClick={handleClick} />);
        
        const imgElement = screen.getByRole('img');
        fireEvent.click(imgElement);

        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('maneja el evento de error de carga (onError)', () => {
        const handleError = vi.fn();
        
        render(<Image src="invalido.jpg" alt="error" onError={handleError} />);
        
        const imgElement = screen.getByRole('img');
        // Simulamos que el navegador no pudo cargar la imagen
        fireEvent.error(imgElement);

        expect(handleError).toHaveBeenCalledTimes(1);
    });

    it('pasa atributos HTML adicionales al elemento img (spread props)', () => {
        // Verifica si el componente permite pasar props extra como width, height, loading, etc.
        render(<Image src="foto.jpg" alt="test" width="200" loading="lazy" data-testid="custom-img" />);
        
        const imgElement = screen.getByTestId('custom-img');
        
        expect(imgElement.getAttribute('width')).toBe('200');
        expect(imgElement.getAttribute('loading')).toBe('lazy');
    });

    it('renderiza correctamente incluso si className es undefined o vacío', () => {
        // Edge case: asegurar que no pinte "undefined" en la clase
        render(<Image src="test.png" alt="test" />); 
        
        const imgElement = screen.getByRole('img');
        // Dependiendo de tu implementación, esto no debería tener "undefined"
        expect(imgElement.className).not.toContain('undefined');
    });
});