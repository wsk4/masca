import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from '../../../components/atoms/Image';
import { describe, expect, test } from 'vitest';

describe('Image Component', () => {
  const defaultProps = {
    src: 'https://ejemplo.com/imagen.jpg',
    alt: 'Descripción de prueba',
  };

  test('debe renderizar la imagen con el src y alt correctos', () => {
    // Ahora TypeScript sabe que className es opcional y no dará error aquí
    render(<Image className={undefined} {...defaultProps} />);

    const imgElement = screen.getByRole('img');

    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', defaultProps.src);
    expect(imgElement).toHaveAttribute('alt', defaultProps.alt);
  });

  test('debe aplicar la className correctamente si se proporciona', () => {
    const testClass = 'clase-de-prueba';
    
    render(<Image {...defaultProps} className={testClass} />);
    
    const imgElement = screen.getByRole('img');
    
    expect(imgElement).toHaveClass(testClass);
  });

  test('debe tener el alt text correcto para accesibilidad', () => {
    render(<Image className={undefined} {...defaultProps} />);
    
    const imgElement = screen.getByAltText(defaultProps.alt);
    
    expect(imgElement).toBeInTheDocument();
  });
});