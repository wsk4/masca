import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputFile from '../../../components/atoms/InputFile';

describe('Componente InputFile', () => {

    it('renderiza el componente con el texto y configuración por defecto', () => {
        const { container } = render(<InputFile />);
        expect(screen.getByText('Seleccionar imagen')).toBeTruthy();
        const inputElement = container.querySelector('input[type="file"]');
        expect(inputElement).toBeTruthy();
        expect(inputElement.getAttribute('accept')).toBe('image/*');
        expect(inputElement.disabled).toBe(false);
    });

    it('ejecuta onChange cuando se selecciona un archivo', () => {
        const handleChange = jasmine.createSpy('handleChange');
        const { container } = render(<InputFile onChange={handleChange} />);
        const inputElement = container.querySelector('input[type="file"]');
        const file = new File(['contenido'], 'foto.png', { type: 'image/png' });
        fireEvent.change(inputElement, { target: { files: [file] } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('muestra texto de carga y deshabilita el input cuando disabled es true', () => {
        const { container } = render(<InputFile disabled={true} />);
        const textoElement = screen.getByText('Subiendo...');
        expect(textoElement).toBeTruthy();
        expect(textoElement.className).toContain('bg-gray-50');
        expect(textoElement.className).toContain('cursor-not-allowed');
        const inputElement = container.querySelector('input[type="file"]');
        expect(inputElement.disabled).toBe(true);
    });

    it('renderiza la imagen de previsualización', () => {
        const testUrl = 'https://ejemplo.com/mi-foto.jpg';
        render(<InputFile preview={testUrl} />);
        const imgElement = screen.getByAltText('Previsualización');
        expect(imgElement).toBeTruthy();
        expect(imgElement.getAttribute('src')).toBe(testUrl);
    });

    it('acepta props personalizados', () => {
        const { container } = render(<InputFile accept=".pdf" className="margin-top-extra" />);
        const inputElement = container.querySelector('input[type="file"]');
        expect(inputElement.getAttribute('accept')).toBe('.pdf');
        expect(container.firstChild.className).toContain('margin-top-extra');
    });
});