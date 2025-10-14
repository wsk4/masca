import React from 'react';
import { render, screen } from '@testing-library/react';
import CardBody from '../../../components/molecules/CardBody';

describe('CardBody Component', () => {
  it('renderiza el título, descripción y precio correctamente', () => {
    render(<CardBody title="Producto A" description="Un excelente producto" price={1500} />);

    const titleElement = screen.getByText('Producto A');
    const descriptionElement = screen.getByText('Un excelente producto');
    const priceElement = screen.getByText('$1500');

    expect(titleElement).toBeTruthy();
    expect(descriptionElement).toBeTruthy();
    expect(priceElement).toBeTruthy();
  });

  it('usa las etiquetas HTML correctas', () => {
    render(<CardBody title="Producto B" description="Descripción breve" price={999} />);

    const titleElement = screen.getByText('Producto B');
    const descriptionElement = screen.getByText('Descripción breve');
    const priceElement = screen.getByText('$999');

    expect(titleElement.tagName.toLowerCase()).toBe('h5');
    expect(descriptionElement.tagName.toLowerCase()).toBe('p');
    expect(priceElement.tagName.toLowerCase()).toBe('span');
  });

  it('aplica las clases CSS correctamente', () => {
    render(<CardBody title="Producto C" description="Texto" price={500} />);

    const titleElement = screen.getByText('Producto C');
    const descriptionElement = screen.getByText('Texto');
    const priceElement = screen.getByText('$500');

    expect(titleElement.className).toContain('card-price');
    expect(descriptionElement.className).toContain('card-price'); 
    expect(priceElement.className).toContain('card-price');
  });
});
