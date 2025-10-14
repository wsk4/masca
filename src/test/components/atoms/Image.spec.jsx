import React from 'react';
import { render, screen } from '@testing-library/react';
import Image from '../../../components/atoms/Image';

describe('Image Component', () => {
  it('renderiza la imagen correctamente', () => {
    render(<Image src="test-image.jpg" alt="Imagen de prueba" />);
    const imageElement = screen.getByAltText('Imagen de prueba');
    expect(imageElement).toBeTruthy(); 
  });

  it('aplica los props correctamente', () => {
    render(<Image src="test-image.jpg" alt="Imagen de prueba" className="img-fluid" />);
    const imageElement = screen.getByAltText('Imagen de prueba');
    expect(imageElement.getAttribute('src')).toBe('test-image.jpg'); 
    expect(imageElement.className).toContain('img-fluid'); 
  });
});