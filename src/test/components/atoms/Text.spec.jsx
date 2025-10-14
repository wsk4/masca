import React from 'react';
import { render, screen } from '@testing-library/react';
import Text from '../../../components/atoms/Text';

describe('Text Component', () => {
  it('renderiza el texto correctamente', () => {
    render(<Text>Hola Mundo</Text>);
    const textElement = screen.getByText('Hola Mundo');
    expect(textElement).toBeTruthy();
  });

  it('usa la etiqueta <p> por defecto', () => {
    render(<Text>Texto por defecto</Text>);
    const textElement = screen.getByText('Texto por defecto');
    expect(textElement.tagName.toLowerCase()).toBe('p'); 
  });

  it('usa la etiqueta pasada en el prop "variant"', () => {
    render(<Text variant="h2">Título de prueba</Text>);
    const textElement = screen.getByText('Título de prueba');
    expect(textElement.tagName.toLowerCase()).toBe('h2'); 
  });

  it('aplica correctamente la clase CSS pasada por props', () => {
    render(<Text className="texto-prueba">Con clase</Text>);
    const textElement = screen.getByText('Con clase');
    expect(textElement.className).toContain('texto-prueba');
  });
});

