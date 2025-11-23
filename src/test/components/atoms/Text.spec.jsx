import React from 'react';
import { render, screen } from '@testing-library/react';
// Ajusta la ruta según dónde tengas tu componente
import Text from '../../../components/atoms/Text';

describe('Componente Text', () => {

    it('renderiza un párrafo <p> por defecto cuando no se pasa variant', () => {
        render(<Text>Texto base</Text>);
        
        // Buscamos por el texto
        const textElement = screen.getByText('Texto base');
        
        // Jasmine: Verificamos existencia
        expect(textElement).toBeTruthy();
        // Jasmine: Verificamos la etiqueta (siempre devuelve mayúsculas)
        expect(textElement.tagName).toBe('P');
    });

    it('renderiza la etiqueta HTML dinámica según el prop variant', () => {
        // Probamos H1
        const { rerender } = render(<Text variant="h1">Soy un Título</Text>);
        let element = screen.getByText('Soy un Título');
        expect(element.tagName).toBe('H1');

        // Probamos SPAN reutilizando el render
        rerender(<Text variant="span">Soy un Span</Text>);
        element = screen.getByText('Soy un Span');
        expect(element.tagName).toBe('SPAN');
    });

    it('aplica las clases CSS pasadas por props', () => {
        const testClass = 'font-bold text-red-500';
        render(<Text className={testClass}>Texto con estilo</Text>);
        
        const textElement = screen.getByText('Texto con estilo');
        
        // Jasmine: Verificamos si el string className contiene nuestras clases
        expect(textElement.className).toContain('font-bold');
        expect(textElement.className).toContain('text-red-500');
    });

    it('renderiza correctamente el contenido children', () => {
        const mensaje = "Hola Mundo";
        render(<Text>{mensaje}</Text>);
        
        // Jasmine: Verificamos que el texto esté presente
        expect(screen.getByText(mensaje)).toBeTruthy();
    });
});