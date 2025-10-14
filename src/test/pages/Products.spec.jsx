import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Products from '../../pages/Products';
import productsData from '../../data/Products';

describe('Products Component', () => {

  it('should render the main title', () => {

    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );
    
    const heading = screen.getByRole('heading', { name: /productos/i });
    expect(heading).toBeTruthy();
  });

  it('should render a card for every product in the data file', () => {

    render(
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    );
    
    const productNames = productsData.map(p => p.name);
    
    const renderedHeadings = screen.getAllByRole('heading', {
        name: new RegExp(productNames.join('|'), 'i') 
    });
    
    expect(renderedHeadings.length).toBe(productsData.length);
    
    productsData.forEach(product => {
      expect(screen.getByText(product.name)).toBeTruthy();
    });
  });
});